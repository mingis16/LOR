-- LÖR website database schema.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- against a fresh project. Safe to re-run: every statement is idempotent.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$ begin
  create type menu_category as enum ('Appetizers', 'Mains', 'Cocktails', 'Shisha & Lounge');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('orange-money', 'afrimoney', 'card', 'pickup');
exception when duplicate_object then null; end $$;

do $$ begin
  create type table_preference as enum (
    'Indoor Lounge', 'Outdoor Terrace', 'Rooftop Bar', 'Private Booth', 'No Preference'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type gym_class_type as enum ('HIIT', 'Strength', 'Yoga');
exception when duplicate_object then null; end $$;

do $$ begin
  create type membership_plan as enum ('Day Pass', 'Monthly', 'VIP');
exception when duplicate_object then null; end $$;

do $$ begin
  create type reservation_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type membership_status as enum ('active', 'cancelled', 'expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_payment_status as enum ('pending', 'paid');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_fulfillment_status as enum ('received', 'preparing', 'ready', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Content tables (menu + gym classes) — admin-editable, publicly readable
-- ---------------------------------------------------------------------------

create table if not exists menu_items (
  id text primary key,
  category menu_category not null,
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  image text not null,
  spicy boolean not null default false,
  vegetarian boolean not null default false,
  popular boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gym_classes (
  id text primary key,
  name text not null,
  type gym_class_type not null,
  day text not null,
  time text not null,
  instructor text not null,
  spots integer not null check (spots > 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Transactional tables — written only by trusted server code (service role)
-- ---------------------------------------------------------------------------

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text not null unique,
  customer_name text not null,
  phone text not null,
  email text,
  pickup_time text not null,
  payment_method payment_method not null,
  payment_status order_payment_status not null default 'pending',
  fulfillment_status order_fulfillment_status not null default 'received',
  subtotal numeric(10, 2) not null,
  service_fee numeric(10, 2) not null,
  total numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_lines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  menu_item_id text not null,
  name text not null,
  quantity integer not null check (quantity > 0),
  price numeric(10, 2) not null,
  line_total numeric(10, 2) not null
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  booking_ref text not null unique,
  guest_name text not null,
  phone text not null,
  email text,
  party_size integer not null check (party_size > 0),
  reservation_date date not null,
  reservation_time text not null,
  table_preference table_preference not null,
  special_requests text,
  status reservation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  membership_id text not null unique,
  full_name text not null,
  phone text not null,
  email text,
  plan membership_plan not null,
  start_date date not null,
  status membership_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  transaction_ref text not null unique,
  order_id uuid not null references orders (id) on delete cascade,
  amount numeric(10, 2) not null,
  method payment_method not null,
  customer_name text not null,
  payer_reference text,
  paid_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_fulfillment_status_idx on orders (fulfillment_status);
create index if not exists order_lines_order_id_idx on order_lines (order_id);
create index if not exists reservations_date_idx on reservations (reservation_date, reservation_time);
create index if not exists reservations_status_idx on reservations (status);
create index if not exists memberships_status_idx on memberships (status);
create index if not exists menu_items_category_idx on menu_items (category, sort_order);
create index if not exists gym_classes_day_idx on gym_classes (day, sort_order);
create index if not exists payments_order_id_idx on payments (order_id);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists menu_items_set_updated_at on menu_items;
create trigger menu_items_set_updated_at before update on menu_items
  for each row execute function set_updated_at();

drop trigger if exists gym_classes_set_updated_at on gym_classes;
create trigger gym_classes_set_updated_at before update on gym_classes
  for each row execute function set_updated_at();

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at before update on orders
  for each row execute function set_updated_at();

drop trigger if exists reservations_set_updated_at on reservations;
create trigger reservations_set_updated_at before update on reservations
  for each row execute function set_updated_at();

drop trigger if exists memberships_set_updated_at on memberships;
create trigger memberships_set_updated_at before update on memberships
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- menu_items / gym_classes: publicly readable (the storefront reads them
-- directly), writes only via service_role (the admin dashboard).
--
-- orders / order_lines / reservations / memberships / payments: RLS enabled
-- with NO policies at all. That denies every request from the anon and
-- authenticated roles outright — the only way in is the service_role key,
-- which bypasses RLS entirely and is used exclusively in trusted
-- server-side code (Next.js API routes + admin server actions), never
-- exposed to the browser. This keeps customer data completely inaccessible
-- to direct client-side queries.
-- ---------------------------------------------------------------------------

alter table menu_items enable row level security;
alter table gym_classes enable row level security;
alter table orders enable row level security;
alter table order_lines enable row level security;
alter table reservations enable row level security;
alter table memberships enable row level security;
alter table payments enable row level security;

drop policy if exists "menu_items are publicly readable" on menu_items;
create policy "menu_items are publicly readable" on menu_items for select using (true);

drop policy if exists "gym_classes are publicly readable" on gym_classes;
create policy "gym_classes are publicly readable" on gym_classes for select using (true);

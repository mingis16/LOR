// Hand-written to match supabase/schema.sql. If the schema changes, update
// this file to match (or regenerate with `supabase gen types typescript`
// once the project is linked via the Supabase CLI).
//
// NOTE: row/insert/update shapes below use `type X = {...}`, not
// `interface X {...}`. postgrest-js's generic resolution checks
// `Row extends Record<string, unknown>`, which `interface` fails to satisfy
// reliably (a TS quirk), silently collapsing every query's result to `never`.

export type MenuCategoryDb = "Appetizers" | "Mains" | "Cocktails" | "Shisha & Lounge";
export type PaymentMethodDb = "orange-money" | "afrimoney" | "card" | "pickup";
export type TablePreferenceDb =
  | "Indoor Lounge"
  | "Outdoor Terrace"
  | "Rooftop Bar"
  | "Private Booth"
  | "No Preference";
export type GymClassTypeDb = "HIIT" | "Strength" | "Yoga";
export type MembershipPlanDb = "Day Pass" | "Monthly" | "VIP";
export type ReservationStatusDb = "pending" | "confirmed" | "cancelled" | "completed";
export type MembershipStatusDb = "active" | "cancelled" | "expired";
export type OrderPaymentStatusDb = "pending" | "paid";
export type OrderFulfillmentStatusDb = "received" | "preparing" | "ready" | "completed" | "cancelled";

type MenuItemRow = {
  id: string;
  category: MenuCategoryDb;
  name: string;
  description: string;
  price: number;
  image: string;
  spicy: boolean;
  vegetarian: boolean;
  popular: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type GymClassRow = {
  id: string;
  name: string;
  type: GymClassTypeDb;
  day: string;
  time: string;
  instructor: string;
  spots: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type OrderRow = {
  id: string;
  order_ref: string;
  customer_name: string;
  phone: string;
  email: string | null;
  pickup_time: string;
  payment_method: PaymentMethodDb;
  payment_status: OrderPaymentStatusDb;
  fulfillment_status: OrderFulfillmentStatusDb;
  subtotal: number;
  service_fee: number;
  total: number;
  created_at: string;
  updated_at: string;
};

type OrderLineRow = {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  line_total: number;
};

type ReservationRow = {
  id: string;
  booking_ref: string;
  guest_name: string;
  phone: string;
  email: string | null;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  table_preference: TablePreferenceDb;
  special_requests: string | null;
  status: ReservationStatusDb;
  created_at: string;
  updated_at: string;
};

type MembershipRow = {
  id: string;
  membership_id: string;
  full_name: string;
  phone: string;
  email: string | null;
  plan: MembershipPlanDb;
  start_date: string;
  status: MembershipStatusDb;
  created_at: string;
  updated_at: string;
};

type PaymentRow = {
  id: string;
  transaction_ref: string;
  order_id: string;
  amount: number;
  method: PaymentMethodDb;
  customer_name: string;
  payer_reference: string | null;
  paid_at: string;
};

// Every field optional except the not-null, no-default columns — matches
// what Postgres actually requires on insert.
type InsertOf<Row, Required extends keyof Row> = Partial<Row> & Pick<Row, Required>;

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: MenuItemRow;
        Insert: InsertOf<MenuItemRow, "id" | "category" | "name" | "description" | "price" | "image">;
        Update: Partial<MenuItemRow>;
        Relationships: [];
      };
      gym_classes: {
        Row: GymClassRow;
        Insert: InsertOf<GymClassRow, "id" | "name" | "type" | "day" | "time" | "instructor" | "spots">;
        Update: Partial<GymClassRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: InsertOf<
          OrderRow,
          "order_ref" | "customer_name" | "phone" | "pickup_time" | "payment_method" | "subtotal" | "service_fee" | "total"
        >;
        Update: Partial<OrderRow>;
        Relationships: [];
      };
      order_lines: {
        Row: OrderLineRow;
        Insert: InsertOf<OrderLineRow, "order_id" | "menu_item_id" | "name" | "quantity" | "price" | "line_total">;
        Update: Partial<OrderLineRow>;
        Relationships: [
          {
            foreignKeyName: "order_lines_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      reservations: {
        Row: ReservationRow;
        Insert: InsertOf<
          ReservationRow,
          "booking_ref" | "guest_name" | "phone" | "party_size" | "reservation_date" | "reservation_time" | "table_preference"
        >;
        Update: Partial<ReservationRow>;
        Relationships: [];
      };
      memberships: {
        Row: MembershipRow;
        Insert: InsertOf<MembershipRow, "membership_id" | "full_name" | "phone" | "plan" | "start_date">;
        Update: Partial<MembershipRow>;
        Relationships: [];
      };
      payments: {
        Row: PaymentRow;
        Insert: InsertOf<PaymentRow, "transaction_ref" | "order_id" | "amount" | "method" | "customer_name">;
        Update: Partial<PaymentRow>;
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

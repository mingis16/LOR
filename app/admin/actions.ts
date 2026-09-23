"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service";
import type {
  GymClassTypeDb,
  MembershipStatusDb,
  MenuCategoryDb,
  OrderFulfillmentStatusDb,
  ReservationStatusDb,
} from "@/lib/supabase/database.types";

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateOrderFulfillment(orderId: string, status: OrderFulfillmentStatusDb) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("orders").update({ fulfillment_status: status }).eq("id", orderId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function updateReservationStatus(id: string, status: ReservationStatusDb) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reservations");
}

export async function updateMembershipStatus(id: string, status: MembershipStatusDb) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("memberships").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/memberships");
}

export interface MenuItemFormInput {
  id: string;
  category: MenuCategoryDb;
  name: string;
  description: string;
  price: number;
  image: string;
  spicy: boolean;
  vegetarian: boolean;
  popular: boolean;
  sortOrder: number;
}

export async function upsertMenuItem(input: MenuItemFormInput) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("menu_items").upsert({
    id: input.id,
    category: input.category,
    name: input.name,
    description: input.description,
    price: input.price,
    image: input.image,
    spicy: input.spicy,
    vegetarian: input.vegetarian,
    popular: input.popular,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
}

export interface GymClassFormInput {
  id: string;
  name: string;
  type: GymClassTypeDb;
  day: string;
  time: string;
  instructor: string;
  spots: number;
  sortOrder: number;
}

export async function upsertGymClass(input: GymClassFormInput) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("gym_classes").upsert({
    id: input.id,
    name: input.name,
    type: input.type,
    day: input.day,
    time: input.time,
    instructor: input.instructor,
    spots: input.spots,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gym-classes");
  revalidatePath("/gym");
}

export async function deleteGymClass(id: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("gym_classes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gym-classes");
  revalidatePath("/gym");
}

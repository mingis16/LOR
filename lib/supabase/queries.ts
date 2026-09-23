import { createServiceRoleClient } from "@/lib/supabase/service";
import type { GymClass, MenuItem } from "@/lib/types";

/**
 * Public read queries backing the storefront (menu + class schedule).
 * These tables are also publicly readable via RLS, but we still read them
 * through the service-role client from trusted Server Components — no need
 * to round-trip through the anon key for content that never varies by user.
 */

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getMenuItems failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    spicy: row.spicy,
    vegetarian: row.vegetarian,
    popular: row.popular,
  }));
}

export async function getGymClasses(): Promise<GymClass[]> {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("gym_classes")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getGymClasses failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type,
    day: row.day,
    time: row.time,
    instructor: row.instructor,
    spots: row.spots,
  }));
}

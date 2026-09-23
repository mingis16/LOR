import { createServiceRoleClient } from "@/lib/supabase/service";
import { MenuItemsManager } from "@/components/admin/MenuItemsManager";

export default async function AdminMenuPage() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    return <p className="text-sm text-red-300">Failed to load menu items: {error.message}</p>;
  }

  const items = data.map((row) => ({
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    spicy: row.spicy,
    vegetarian: row.vegetarian,
    popular: row.popular,
    sortOrder: row.sort_order,
  }));

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Menu Items</h1>
      <p className="mt-1 text-sm text-white/50">
        Changes appear on /menu and the homepage immediately — no deploy needed.
      </p>
      <div className="mt-6">
        <MenuItemsManager items={items} />
      </div>
    </div>
  );
}

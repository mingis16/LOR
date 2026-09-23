import { createServiceRoleClient } from "@/lib/supabase/service";
import { GymClassesManager } from "@/components/admin/GymClassesManager";

export default async function AdminGymClassesPage() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("gym_classes").select("*").order("sort_order", { ascending: true });

  if (error) {
    return <p className="text-sm text-red-300">Failed to load gym classes: {error.message}</p>;
  }

  const classes = data.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type,
    day: row.day,
    time: row.time,
    instructor: row.instructor,
    spots: row.spots,
    sortOrder: row.sort_order,
  }));

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Gym Classes</h1>
      <p className="mt-1 text-sm text-white/50">Changes appear on /gym immediately — no deploy needed.</p>
      <div className="mt-6">
        <GymClassesManager classes={classes} />
      </div>
    </div>
  );
}

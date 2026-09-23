import { createServiceRoleClient } from "@/lib/supabase/service";
import { ReservationStatusCell } from "@/components/admin/ReservationStatusCell";

export default async function AdminReservationsPage() {
  const supabase = createServiceRoleClient();
  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("*")
    .order("reservation_date", { ascending: true })
    .order("reservation_time", { ascending: true })
    .limit(200);

  if (error) {
    return <p className="text-sm text-red-300">Failed to load reservations: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Reservations</h1>
      <p className="mt-1 text-sm text-white/50">{reservations?.length ?? 0} upcoming and recent reservations.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/50">
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Party</th>
              <th className="px-4 py-3">Table</th>
              <th className="px-4 py-3">Requests</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(reservations ?? []).map((r) => (
              <tr key={r.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{r.guest_name}</p>
                  <p className="text-xs text-white/40">
                    {r.phone}
                    {r.email ? ` · ${r.email}` : ""}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#d4af37]">{r.booking_ref}</p>
                </td>
                <td className="px-4 py-3 text-white/80">
                  {r.reservation_date}
                  <br />
                  <span className="text-white/50">{r.reservation_time}</span>
                </td>
                <td className="px-4 py-3 text-white/80">{r.party_size}</td>
                <td className="px-4 py-3 text-white/80">{r.table_preference}</td>
                <td className="px-4 py-3 max-w-[220px] truncate text-white/60" title={r.special_requests ?? ""}>
                  {r.special_requests || "—"}
                </td>
                <td className="px-4 py-3">
                  <ReservationStatusCell id={r.id} status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!reservations || reservations.length === 0) && (
          <p className="p-6 text-center text-sm text-white/40">No reservations yet.</p>
        )}
      </div>
    </div>
  );
}

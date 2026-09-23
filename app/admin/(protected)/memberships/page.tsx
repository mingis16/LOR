import { createServiceRoleClient } from "@/lib/supabase/service";
import { formatDate } from "@/lib/utils";
import { MembershipStatusCell } from "@/components/admin/MembershipStatusCell";

export default async function AdminMembershipsPage() {
  const supabase = createServiceRoleClient();
  const { data: memberships, error } = await supabase
    .from("memberships")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return <p className="text-sm text-red-300">Failed to load memberships: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Memberships</h1>
      <p className="mt-1 text-sm text-white/50">{memberships?.length ?? 0} registered members.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wider text-white/50">
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(memberships ?? []).map((m) => (
              <tr key={m.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{m.full_name}</p>
                  <p className="text-xs text-white/40">
                    {m.phone}
                    {m.email ? ` · ${m.email}` : ""}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#d4af37]">{m.membership_id}</p>
                </td>
                <td className="px-4 py-3 text-white/80">{m.plan}</td>
                <td className="px-4 py-3 text-white/80">{formatDate(m.start_date)}</td>
                <td className="px-4 py-3">
                  <MembershipStatusCell id={m.id} status={m.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!memberships || memberships.length === 0) && (
          <p className="p-6 text-center text-sm text-white/40">No memberships yet.</p>
        )}
      </div>
    </div>
  );
}

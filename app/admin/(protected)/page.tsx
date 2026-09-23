import Link from "next/link";
import { ShoppingBag, CalendarClock, IdCard, ArrowRight } from "lucide-react";
import { createServiceRoleClient } from "@/lib/supabase/service";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const supabase = createServiceRoleClient();

  const [{ count: pendingOrders }, { count: pendingReservations }, { count: activeMemberships }, { data: recentOrders }, { data: recentReservations }] =
    await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }).in("fulfillment_status", ["received", "preparing"]),
      supabase.from("reservations").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("memberships").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("orders").select("id, order_ref, customer_name, total, payment_status, fulfillment_status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("reservations").select("id, booking_ref, guest_name, party_size, reservation_date, reservation_time, status").order("created_at", { ascending: false }).limit(5),
    ]);

  const stats = [
    { label: "Orders Needing Attention", value: pendingOrders ?? 0, href: "/admin/orders", icon: ShoppingBag },
    { label: "Pending Reservations", value: pendingReservations ?? 0, href: "/admin/reservations", icon: CalendarClock },
    { label: "Active Memberships", value: activeMemberships ?? 0, href: "/admin/memberships", icon: IdCard },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Overview</h1>
      <p className="mt-1 text-sm text-white/50">A snapshot of what needs your attention right now.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#d4af37]/40"
          >
            <Icon className="text-[#d4af37]" size={24} />
            <p className="mt-4 text-3xl font-bold text-white">{value}</p>
            <p className="mt-1 text-sm text-white/60">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs text-[#d4af37] hover:text-[#e8c454]">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {(recentOrders ?? []).map((o) => (
              <div key={o.id} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{o.customer_name}</p>
                  <p className="text-xs text-white/40">
                    {o.order_ref} &middot; {formatDateTime(o.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">{formatCurrency(Number(o.total))}</p>
                  <p className="text-xs capitalize text-white/40">{o.fulfillment_status}</p>
                </div>
              </div>
            ))}
            {(!recentOrders || recentOrders.length === 0) && <p className="text-sm text-white/40">No orders yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Reservations</h2>
            <Link href="/admin/reservations" className="flex items-center gap-1 text-xs text-[#d4af37] hover:text-[#e8c454]">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {(recentReservations ?? []).map((r) => (
              <div key={r.id} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{r.guest_name}</p>
                  <p className="text-xs text-white/40">
                    {r.booking_ref} &middot; Party of {r.party_size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white">{r.reservation_date}</p>
                  <p className="text-xs text-white/40">{r.reservation_time}</p>
                </div>
              </div>
            ))}
            {(!recentReservations || recentReservations.length === 0) && (
              <p className="text-sm text-white/40">No reservations yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

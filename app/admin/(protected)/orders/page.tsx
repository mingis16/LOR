import { createServiceRoleClient } from "@/lib/supabase/service";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { OrderStatusCell } from "@/components/admin/OrderStatusCell";

export default async function AdminOrdersPage() {
  const supabase = createServiceRoleClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, order_lines(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return <p className="text-sm text-red-300">Failed to load orders: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-white">Orders</h1>
      <p className="mt-1 text-sm text-white/50">{orders?.length ?? 0} most recent orders.</p>

      <div className="mt-6 space-y-4">
        {(orders ?? []).map((order) => (
          <div key={order.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-[#d4af37]">{order.order_ref}</p>
                <p className="mt-0.5 font-medium text-white">{order.customer_name}</p>
                <p className="text-xs text-white/40">{order.phone}{order.email ? ` · ${order.email}` : ""}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{formatCurrency(Number(order.total))}</p>
                <p className="text-xs text-white/40">{formatDateTime(order.created_at)}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <span>Pickup: {order.pickup_time}</span>
              <span className="capitalize">Payment: {order.payment_method.replace("-", " ")}</span>
              <span
                className={
                  order.payment_status === "paid"
                    ? "rounded-full bg-green-500/15 px-2 py-0.5 text-green-400"
                    : "rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-400"
                }
              >
                {order.payment_status}
              </span>
            </div>

            <ul className="mt-3 space-y-1 border-t border-white/5 pt-3 text-sm text-white/70">
              {order.order_lines.map((line) => (
                <li key={line.id} className="flex justify-between">
                  <span>{line.quantity}&times; {line.name}</span>
                  <span>{formatCurrency(Number(line.line_total))}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Fulfillment</span>
              <OrderStatusCell orderId={order.id} status={order.fulfillment_status} />
            </div>
          </div>
        ))}
        {(!orders || orders.length === 0) && <p className="text-sm text-white/40">No orders yet.</p>}
      </div>
    </div>
  );
}

"use client";

import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateOrderFulfillment } from "@/app/admin/actions";
import type { OrderFulfillmentStatusDb } from "@/lib/supabase/database.types";

const OPTIONS: OrderFulfillmentStatusDb[] = ["received", "preparing", "ready", "completed", "cancelled"];

export function OrderStatusCell({ orderId, status }: { orderId: string; status: OrderFulfillmentStatusDb }) {
  return (
    <StatusSelect
      value={status}
      options={OPTIONS}
      onChange={(next) => updateOrderFulfillment(orderId, next)}
    />
  );
}

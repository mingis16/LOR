"use client";

import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateReservationStatus } from "@/app/admin/actions";
import type { ReservationStatusDb } from "@/lib/supabase/database.types";

const OPTIONS: ReservationStatusDb[] = ["pending", "confirmed", "completed", "cancelled"];

export function ReservationStatusCell({ id, status }: { id: string; status: ReservationStatusDb }) {
  return <StatusSelect value={status} options={OPTIONS} onChange={(next) => updateReservationStatus(id, next)} />;
}

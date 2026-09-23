"use client";

import { StatusSelect } from "@/components/admin/StatusSelect";
import { updateMembershipStatus } from "@/app/admin/actions";
import type { MembershipStatusDb } from "@/lib/supabase/database.types";

const OPTIONS: MembershipStatusDb[] = ["active", "expired", "cancelled"];

export function MembershipStatusCell({ id, status }: { id: string; status: MembershipStatusDb }) {
  return <StatusSelect value={status} options={OPTIONS} onChange={(next) => updateMembershipStatus(id, next)} />;
}

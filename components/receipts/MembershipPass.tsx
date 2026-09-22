"use client";

import type { MembershipData } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ReceiptShell, ReceiptRow } from "./ReceiptShell";

export function MembershipPass({ data, onClose }: { data: MembershipData; onClose?: () => void }) {
  return (
    <ReceiptShell title="Membership Confirmation" statusLabel={data.plan} statusTone="gold" onClose={onClose}>
      <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 print:text-black/50">
        LÖR Fitness Booking Confirmation
      </p>
      <p className="mt-1 text-center font-mono text-lg font-semibold text-[#d4af37] print:text-black">
        {data.membershipId}
      </p>

      <div className="mt-5 space-y-1">
        <ReceiptRow label="Member Name" value={data.fullName} />
        <ReceiptRow label="Phone" value={data.phone} />
        {data.email && <ReceiptRow label="Email" value={data.email} />}
        <ReceiptRow label="Plan" value={data.plan} strong />
        <ReceiptRow label="Start Date" value={formatDate(data.startDate)} />
      </div>

      <div className="mt-4 border-t border-white/10 pt-4 print:border-black/20">
        <ReceiptRow label="Registered" value={formatDateTime(data.createdAt)} />
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40 print:text-black/50">
        Present this pass at the LÖR Fitness front desk to activate your membership and receive your
        access card.
      </p>
    </ReceiptShell>
  );
}

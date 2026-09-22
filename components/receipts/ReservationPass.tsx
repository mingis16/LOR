"use client";

import type { ReservationData } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ReceiptShell, ReceiptRow } from "./ReceiptShell";

export function ReservationPass({ data, onClose }: { data: ReservationData; onClose?: () => void }) {
  return (
    <ReceiptShell title="Reservation Pass" statusLabel="Confirmed" statusTone="green" onClose={onClose}>
      <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 print:text-black/50">
        Digital Reservation Pass
      </p>
      <p className="mt-1 text-center font-mono text-lg font-semibold text-[#d4af37] print:text-black">
        {data.bookingRef}
      </p>

      <div className="mt-5 space-y-1 border-b border-white/10 pb-4 print:border-black/20">
        <ReceiptRow label="Guest Name" value={data.guestName} />
        <ReceiptRow label="Phone" value={data.phone} />
        {data.email && <ReceiptRow label="Email" value={data.email} />}
      </div>

      <div className="mt-4 space-y-1">
        <ReceiptRow label="Date" value={formatDate(data.date)} strong />
        <ReceiptRow label="Time" value={data.time} strong />
        <ReceiptRow label="Party Size" value={`${data.partySize} guest${data.partySize > 1 ? "s" : ""}`} />
        <ReceiptRow label="Table Preference" value={data.tablePreference} />
        {data.specialRequests && <ReceiptRow label="Notes" value={data.specialRequests} />}
      </div>

      <div className="mt-4 border-t border-white/10 pt-4 print:border-black/20">
        <ReceiptRow label="Booked" value={formatDateTime(data.createdAt)} />
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40 print:text-black/50">
        Please present this pass (digital or printed) to staff on arrival. Tables are held for 15
        minutes past the reservation time.
      </p>
    </ReceiptShell>
  );
}

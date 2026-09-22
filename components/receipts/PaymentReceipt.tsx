"use client";

import type { PaymentReceiptData } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { ReceiptShell, ReceiptRow } from "./ReceiptShell";

const METHOD_LABEL: Record<string, string> = {
  "orange-money": "Orange Money",
  afrimoney: "Africell Afrimoney",
  card: "Visa / Mastercard",
};

export function PaymentReceipt({ data, onClose }: { data: PaymentReceiptData; onClose?: () => void }) {
  return (
    <ReceiptShell title="Payment Receipt" statusLabel="Verified" statusTone="green" onClose={onClose}>
      <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 print:text-black/50">
        Digital Payment Receipt
      </p>
      <p className="mt-1 text-center font-mono text-lg font-semibold text-[#d4af37] print:text-black">
        {data.transactionRef}
      </p>

      <div className="mt-5 space-y-1">
        <ReceiptRow label="Order Reference" value={data.orderId} />
        <ReceiptRow label="Customer" value={data.customerName} />
        <ReceiptRow label="Payment Method" value={METHOD_LABEL[data.method] ?? data.method} />
        <ReceiptRow label="Paid At" value={formatDateTime(data.paidAt)} />
      </div>

      <div className="mt-4 border-t border-white/10 pt-4 print:border-black/20">
        <ReceiptRow label="Amount Paid" value={formatCurrency(data.amount)} strong />
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40 print:text-black/50">
        This receipt confirms a verified transaction. Show it to venue staff if any discrepancy
        arises with your order or reservation.
      </p>
    </ReceiptShell>
  );
}

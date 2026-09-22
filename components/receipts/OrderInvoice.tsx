"use client";

import type { OrderInvoiceData } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { ReceiptShell, ReceiptRow } from "./ReceiptShell";

const METHOD_LABEL: Record<string, string> = {
  "orange-money": "Orange Money",
  afrimoney: "Africell Afrimoney",
  card: "Visa / Mastercard",
  pickup: "Pay on Pickup",
};

export function OrderInvoice({ data, onClose }: { data: OrderInvoiceData; onClose?: () => void }) {
  return (
    <ReceiptShell
      title="Order Invoice"
      statusLabel={data.status === "paid" ? "Paid" : "Pending Payment"}
      statusTone={data.status === "paid" ? "green" : "amber"}
      onClose={onClose}
    >
      <p className="text-center text-xs uppercase tracking-[0.25em] text-white/40 print:text-black/50">
        Digital Order Invoice
      </p>
      <p className="mt-1 text-center font-mono text-lg font-semibold text-[#d4af37] print:text-black">
        {data.orderId}
      </p>

      <div className="mt-5 space-y-1 border-b border-white/10 pb-4 print:border-black/20">
        <ReceiptRow label="Customer" value={data.customer.name} />
        <ReceiptRow label="Phone" value={data.customer.phone} />
        {data.customer.email && <ReceiptRow label="Email" value={data.customer.email} />}
        <ReceiptRow label="Pickup Time" value={data.pickupTime} />
        <ReceiptRow label="Payment Method" value={METHOD_LABEL[data.paymentMethod]} />
        <ReceiptRow label="Issued" value={formatDateTime(data.createdAt)} />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50 print:text-black/60">
          Itemized Order
        </p>
        {data.lines.map((line) => (
          <div key={line.name} className="flex items-start justify-between text-sm">
            <span className="text-white/80 print:text-black">
              {line.quantity} &times; {line.name}
            </span>
            <span className="shrink-0 pl-3 text-white/80 print:text-black">{formatCurrency(line.lineTotal)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 border-t border-white/10 pt-4 print:border-black/20">
        <ReceiptRow label="Subtotal" value={formatCurrency(data.subtotal)} />
        <ReceiptRow label="Service Fee" value={formatCurrency(data.serviceFee)} />
        <ReceiptRow label="Total" value={formatCurrency(data.total)} strong />
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-white/40 print:text-black/50">
        Present this invoice (digital or printed) at pickup. Order IDs are unique — please avoid
        sharing screenshots of other guests&apos; invoices.
      </p>
    </ReceiptShell>
  );
}

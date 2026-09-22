"use client";

import type { ReactNode } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReceiptShell({
  title,
  statusLabel,
  statusTone = "gold",
  onClose,
  children,
}: {
  title: string;
  statusLabel?: string;
  statusTone?: "gold" | "green" | "amber";
  onClose?: () => void;
  children: ReactNode;
}) {
  const toneClasses = {
    gold: "bg-[#d4af37]/15 text-[#d4af37] border-[#d4af37]/40",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  }[statusTone];

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <Button size="md" variant="secondary" onClick={() => window.print()}>
            <Download size={16} /> Print / Save PDF
          </Button>
          {onClose && (
            <button
              aria-label="Close receipt"
              onClick={onClose}
              className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="receipt-print-area rounded-2xl border border-[#d4af37]/30 bg-[#0f0f0f] p-6 text-white shadow-[0_0_40px_rgba(212,175,55,0.08)] print:border-none print:bg-white print:text-black print:shadow-none">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4 print:border-black/20">
          <p className="font-serif text-xl font-semibold tracking-[0.2em] print:text-black">
            L<span className="text-[#d4af37] print:text-black">Ö</span>R
          </p>
          {statusLabel && (
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneClasses} print:border-black/30 print:bg-transparent print:text-black`}>
              {statusLabel}
            </span>
          )}
        </div>
        {children}
        <div className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-white/40 print:border-black/20 print:text-black/50">
          Goderich Road, Freetown, Sierra Leone &middot; +232 90 002000
        </div>
      </div>
    </div>
  );
}

export function ReceiptRow({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-white/55 print:text-black/60">{label}</span>
      <span className={`text-right ${strong ? "font-semibold text-white print:text-black" : "text-white/85 print:text-black"}`}>
        {value}
      </span>
    </div>
  );
}

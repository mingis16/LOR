"use client";

import React from "react";
import { CheckCircle2, Clock, MapPin, Printer, ShieldCheck } from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // in SLL / Le
}

export interface OrderInvoiceProps {
  orderId: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  pickupTime: string;
  paymentMethod: "Mobile Money" | "Card" | "Pay on Pickup";
  paymentStatus: "PAID" | "PENDING";
  transactionRef?: string;
  onClose?: () => void;
}

export const OrderInvoice: React.FC<OrderInvoiceProps> = ({
  orderId,
  customerName,
  phone,
  items,
  subtotal,
  tax,
  total,
  pickupTime,
  paymentMethod,
  paymentStatus,
  transactionRef,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-print-area max-w-xl mx-auto my-8 bg-[#121212] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
      {/* Header Controls (Hidden during print) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 print:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Verified Order Receipt
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#d4af37] text-black hover:bg-[#c5a059] font-medium text-xs rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xs px-2 py-1"
            >
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* Brand Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-widest uppercase text-[#d4af37] print:text-black">
          LÖR
        </h1>
        <p className="text-xs tracking-wider text-gray-400 uppercase print:text-gray-600">
          Restaurant & Lounge • Freetown
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1 print:text-gray-600">
          <MapPin className="w-3 h-3 text-[#d4af37]" /> Goderich Road, Freetown, Sierra Leone
        </p>
      </div>

      {/* Order Status Badge */}
      <div className="bg-[#1a1a1a] print:bg-gray-100 rounded-xl p-4 mb-6 flex items-center justify-between border border-white/5 print:border-gray-300">
        <div>
          <span className="text-xs text-gray-400 uppercase block print:text-gray-600">Order ID</span>
          <span className="text-lg font-mono font-bold text-[#d4af37] print:text-black">
            #{orderId}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 uppercase block print:text-gray-600">Payment Status</span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              paymentStatus === "PAID"
                ? "bg-green-500/20 text-green-400 border border-green-500/30 print:bg-green-100 print:text-green-800"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30 print:bg-amber-100 print:text-amber-800"
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            {paymentStatus}
          </span>
        </div>
      </div>

      {/* Customer & Pickup Details */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-6 border-b border-white/10 print:border-gray-300 pb-4">
        <div>
          <span className="text-gray-400 block uppercase print:text-gray-600">Customer Name</span>
          <span className="font-semibold text-white print:text-black text-sm">{customerName}</span>
          <span className="text-gray-400 block mt-0.5">{phone}</span>
        </div>
        <div>
          <span className="text-gray-400 block uppercase print:text-gray-600">Pickup Details</span>
          <span className="font-semibold text-white print:text-black text-sm flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {pickupTime}
          </span>
          <span className="text-gray-400 block mt-0.5">Method: {paymentMethod}</span>
          {transactionRef && (
            <span className="text-gray-400 block font-mono">Ref: {transactionRef}</span>
          )}
        </div>
      </div>

      {/* Itemized Order Table */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-3 print:text-black">
          Order Summary
        </h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm border-b border-white/5 print:border-gray-200 pb-2"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#d4af37]/20 text-[#d4af37] print:bg-gray-200 print:text-black font-bold text-xs px-2 py-0.5 rounded">
                  {item.quantity}x
                </span>
                <span className="text-gray-200 print:text-black font-medium">{item.name}</span>
              </div>
              <span className="font-mono text-gray-300 print:text-black">
                NLe {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-1.5 text-xs border-t border-white/10 print:border-gray-300 pt-4 mb-6">
        <div className="flex justify-between text-gray-400 print:text-gray-600">
          <span>Subtotal</span>
          <span className="font-mono">NLe {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-400 print:text-gray-600">
          <span>Taxes & Fees</span>
          <span className="font-mono">NLe {tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-white print:text-black pt-2 border-t border-white/10 print:border-gray-300">
          <span>Total Amount</span>
          <span className="text-[#d4af37] print:text-black font-mono">
            NLe {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Barcode & Verification Stub for Staff */}
      <div className="border-t-2 border-dashed border-white/20 print:border-gray-400 pt-4 text-center">
        <div className="font-mono tracking-widest text-xs text-gray-400 print:text-gray-600 mb-1">
          ||||| ||||||| |||| |||||| ||||||| |||||
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider print:text-gray-600">
          Show this invoice to LÖR restaurant staff upon order pickup.
        </p>
      </div>
    </div>
  );
};

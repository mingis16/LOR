"use client";

import React from "react";
import { Calendar, Users, Clock, MapPin, Printer, ShieldCheck, UtensilsCrossed } from "lucide-react";

export interface ReservationReceiptProps {
  bookingRef: string;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  tablePreference?: string;
  specialRequests?: string;
  onClose?: () => void;
}

export const ReservationReceipt: React.FC<ReservationReceiptProps> = ({
  bookingRef,
  guestName,
  phone,
  email,
  date,
  time,
  partySize,
  tablePreference = "Standard Dining",
  specialRequests,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-print-area max-w-lg mx-auto my-8 bg-[#121212] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative print:bg-white print:text-black print:border-none print:p-0">
      {/* Action Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 print:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Confirmed Booking Pass
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#d4af37] text-black hover:bg-[#c5a059] font-medium text-xs rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Pass
          </button>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xs px-2 py-1">
              ✕ Close
            </button>
          )}
        </div>
      </div>

      {/* Brand Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4af37]/10 mb-2 print:bg-gray-100">
          <UtensilsCrossed className="w-6 h-6 text-[#d4af37] print:text-black" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-widest uppercase text-[#d4af37] print:text-black">
          LÖR RESTAURANT & LOUNGE
        </h1>
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1 print:text-gray-600">
          <MapPin className="w-3 h-3 text-[#d4af37]" /> Goderich Road, Freetown, Sierra Leone
        </p>
      </div>

      {/* Booking Reference Hero Card */}
      <div className="bg-[#1a1a1a] print:bg-gray-100 rounded-xl p-4 text-center mb-6 border border-[#d4af37]/20 print:border-gray-300">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest block print:text-gray-600 mb-1">
          Reservation Reference Code
        </span>
        <span className="text-2xl font-mono font-bold tracking-widest text-[#d4af37] print:text-black">
          {bookingRef}
        </span>
      </div>

      {/* Table & Schedule Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#181818] print:bg-gray-50 p-3 rounded-lg border border-white/5 print:border-gray-200">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 print:text-gray-600 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Date
          </div>
          <span className="text-sm font-semibold text-white print:text-black">{date}</span>
        </div>

        <div className="bg-[#181818] print:bg-gray-50 p-3 rounded-lg border border-white/5 print:border-gray-200">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 print:text-gray-600 mb-1">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> Time
          </div>
          <span className="text-sm font-semibold text-white print:text-black">{time}</span>
        </div>

        <div className="bg-[#181818] print:bg-gray-50 p-3 rounded-lg border border-white/5 print:border-gray-200">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 print:text-gray-600 mb-1">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" /> Guests
          </div>
          <span className="text-sm font-semibold text-white print:text-black">
            {partySize} {partySize === 1 ? "Person" : "People"}
          </span>
        </div>

        <div className="bg-[#181818] print:bg-gray-50 p-3 rounded-lg border border-white/5 print:border-gray-200">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 print:text-gray-600 mb-1">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#d4af37]" /> Seating Area
          </div>
          <span className="text-sm font-semibold text-white print:text-black">{tablePreference}</span>
        </div>
      </div>

      {/* Guest Personal Info */}
      <div className="text-xs space-y-2 border-t border-white/10 print:border-gray-300 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400 print:text-gray-600">Reserved For:</span>
          <span className="font-semibold text-white print:text-black">{guestName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 print:text-gray-600">Contact Number:</span>
          <span className="text-gray-300 print:text-black">{phone}</span>
        </div>
        {email && (
          <div className="flex justify-between">
            <span className="text-gray-400 print:text-gray-600">Email Address:</span>
            <span className="text-gray-300 print:text-black">{email}</span>
          </div>
        )}
        {specialRequests && (
          <div className="pt-2">
            <span className="text-gray-400 block print:text-gray-600 mb-0.5">Special Requests:</span>
            <p className="text-gray-300 print:text-black italic bg-[#1a1a1a] print:bg-gray-100 p-2 rounded border border-white/5">
              &quot;{specialRequests}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Receptionist Verification Stub */}
      <div className="border-t-2 border-dashed border-white/20 print:border-gray-400 pt-4 text-center">
        <p className="text-[11px] text-gray-400 print:text-gray-600">
          Please present this digital confirmation pass or booking reference to the receptionist upon arrival at LÖR.
        </p>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Smartphone, CreditCard, Banknote, ShieldCheck, AlertCircle } from "lucide-react";

export interface PaymentDetails {
  method: "orange_money" | "afrimoney" | "card" | "pay_on_pickup";
  phoneNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

interface PaymentSelectorProps {
  totalAmount: number;
  onPaymentComplete: (details: PaymentDetails) => void;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({ totalAmount, onPaymentComplete }) => {
  const [method, setMethod] = useState<"orange_money" | "afrimoney" | "card" | "pay_on_pickup">("orange_money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Sierra Leone Mobile Money Input Validation
    if (method === "orange_money" || method === "afrimoney") {
      const cleanPhone = phoneNumber.replace(/\s+/g, "");
      // Expecting Sierra Leone numbers (e.g., 076/078/079/088 or +232/232 prefixes)
      const slPhoneRegex = /^(?:\+232|232|0)?(7\d|8\d|9\d|3\d)\d{6}$/;

      if (!slPhoneRegex.test(cleanPhone)) {
        setErrorMessage("Please enter a valid Sierra Leone Mobile Money phone number (e.g. 076XXXXXX or 088XXXXXX).");
        return;
      }
    }

    // Card Input Validation
    if (method === "card") {
      const cleanCard = cardNumber.replace(/\s+/g, "");
      if (cleanCard.length < 15 || cleanCard.length > 16) {
        setErrorMessage("Please enter a valid 15 or 16-digit ATM / Credit Card number.");
        return;
      }
      if (!cardExpiry.includes("/") || cardExpiry.length < 5) {
        setErrorMessage("Please enter a valid card expiration date (MM/YY).");
        return;
      }
      if (cardCvc.length < 3) {
        setErrorMessage("Please enter a valid 3-digit CVC code.");
        return;
      }
    }

    // Process valid submission
    onPaymentComplete({
      method,
      phoneNumber,
      cardNumber: cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : undefined,
      cardExpiry,
      cardCvc,
    });
  };

  return (
    <div className="bg-[#121212] border border-[#d4af37]/30 rounded-2xl p-6 max-w-lg mx-auto text-white shadow-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#d4af37] tracking-wide">Select Payment Method</h3>
        <p className="text-xs text-gray-400 mt-1">
          Total Payable: <span className="text-white font-mono font-bold">NLe {totalAmount.toLocaleString()}</span>
        </p>
      </div>

      {/* Payment Options Toggle */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => { setMethod("orange_money"); setErrorMessage(null); }}
          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
            method === "orange_money"
              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
              : "bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/20"
          }`}
        >
          <Smartphone className="w-5 h-5" />
          Orange Money
        </button>

        <button
          type="button"
          onClick={() => { setMethod("afrimoney"); setErrorMessage(null); }}
          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
            method === "afrimoney"
              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
              : "bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/20"
          }`}
        >
          <Smartphone className="w-5 h-5 text-red-400" />
          AfriMoney
        </button>

        <button
          type="button"
          onClick={() => { setMethod("card"); setErrorMessage(null); }}
          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
            method === "card"
              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
              : "bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/20"
          }`}
        >
          <CreditCard className="w-5 h-5" />
          ATM / Visa / Card
        </button>

        <button
          type="button"
          onClick={() => { setMethod("pay_on_pickup"); setErrorMessage(null); }}
          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
            method === "pay_on_pickup"
              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
              : "bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/20"
          }`}
        >
          <Banknote className="w-5 h-5" />
          Pay on Arrival
        </button>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Forms */}
      <form onSubmit={validateAndSubmit} className="space-y-4">
        {(method === "orange_money" || method === "afrimoney") && (
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
              {method === "orange_money" ? "Orange Money Number" : "AfriMoney Number"}
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 076 000 000"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              A USSD authorization prompt will be pushed to this mobile number.
            </span>
          </div>
        )}

        {method === "card" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Card Number</label>
              <input
                type="text"
                required
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4000 0000 0000 0000"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Expiry (MM/YY)</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="12/28"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">CVC</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  placeholder="123"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>
        )}

        {method === "pay_on_pickup" && (
          <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 text-xs text-gray-300">
            <p>You can pay via Cash, POS Card Terminal, or Mobile Money directly to staff when you arrive at LÖR Goderich Road.</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <ShieldCheck className="w-5 h-5" />
          Confirm & Pay NLe {totalAmount.toLocaleString()}
        </button>
      </form>
    </div>
  );
};

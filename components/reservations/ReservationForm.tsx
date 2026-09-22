"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { reservationSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { ReservationPass } from "@/components/receipts/ReservationPass";
import type { ReservationData, TablePreference } from "@/lib/types";

const TABLE_OPTIONS: TablePreference[] = [
  "No Preference",
  "Indoor Lounge",
  "Outdoor Terrace",
  "Rooftop Bar",
  "Private Booth",
];

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#d4af37]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ReservationForm() {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tablePreference, setTablePreference] = useState<TablePreference>("No Preference");
  const [specialRequests, setSpecialRequests] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<ReservationData | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = { guestName, phone, email, partySize, date, time, tablePreference, specialRequests, website };
    const check = reservationSchema.safeParse(payload);
    if (!check.success) {
      setError(check.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not complete your reservation. Please try again.");
      setReservation(data.reservation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (reservation) {
    return (
      <div className="flex flex-col items-center gap-6">
        <ReservationPass data={reservation} />
        <Button
          size="md"
          variant="secondary"
          onClick={() => {
            setReservation(null);
            setGuestName("");
            setPhone("");
            setEmail("");
            setPartySize(2);
            setDate("");
            setTime("");
            setSpecialRequests("");
          }}
          className="print:hidden"
        >
          Make Another Reservation
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="res-website">Leave this field empty</label>
        <input
          id="res-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <Field label="Guest Name" htmlFor="res-name">
        <input id="res-name" required value={guestName} onChange={(e) => setGuestName(e.target.value)} className={inputClass} placeholder="Jane Doe" />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number" htmlFor="res-phone">
          <input id="res-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="076 123456" inputMode="tel" />
        </Field>
        <Field label="Email (optional)" htmlFor="res-email">
          <input id="res-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="jane@example.com" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="Date" htmlFor="res-date">
          <input id="res-date" required type="date" min={todayStr} value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Time" htmlFor="res-time">
          <input id="res-time" required type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Party Size" htmlFor="res-party">
          <input
            id="res-party"
            required
            type="number"
            min={1}
            max={20}
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Table Preference" htmlFor="res-table">
        <select
          id="res-table"
          value={tablePreference}
          onChange={(e) => setTablePreference(e.target.value as TablePreference)}
          className={inputClass}
        >
          {TABLE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0a0a]">
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Special Requests (optional)" htmlFor="res-notes">
        <textarea
          id="res-notes"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className={inputClass}
          rows={3}
          placeholder="Birthday celebration, dietary needs, etc."
        />
      </Field>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Reservation"}
      </Button>
    </form>
  );
}

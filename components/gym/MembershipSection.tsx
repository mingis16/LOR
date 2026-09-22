"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { MEMBERSHIP_OPTIONS } from "@/lib/data";
import { membershipSchema } from "@/lib/validation";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { MembershipPass } from "@/components/receipts/MembershipPass";
import type { MembershipData, MembershipPlan } from "@/lib/types";

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

export function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>("Monthly");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = { fullName, phone, email, plan: selectedPlan, startDate, website };
    const check = membershipSchema.safeParse(payload);
    if (!check.success) {
      setError(check.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not complete registration. Please try again.");
      setMembership(data.membership);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {MEMBERSHIP_OPTIONS.map((plan) => (
            <button
              key={plan.plan}
              type="button"
              onClick={() => setSelectedPlan(plan.plan)}
              className={cn(
                "flex flex-col rounded-2xl border p-6 text-left transition-colors",
                selectedPlan === plan.plan
                  ? "border-[#d4af37] bg-[#d4af37]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-white">{plan.plan}</h3>
                {selectedPlan === plan.plan && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[#0a0a0a]">
                    <Check size={13} />
                  </span>
                )}
              </div>
              <p className="mt-1 text-xl font-bold text-white">
                {formatCurrency(plan.price)} <span className="text-xs font-normal text-white/50">{plan.period}</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-white/60">
                {plan.perks.map((perk) => (
                  <li key={perk}>&bull; {perk}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {membership ? (
          <div className="flex flex-col items-center gap-6">
            <MembershipPass data={membership} />
            <Button size="md" variant="secondary" onClick={() => setMembership(null)} className="print:hidden">
              Register Another Member
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <label htmlFor="mem-website">Leave this field empty</label>
              <input
                id="mem-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <p className="text-sm font-semibold text-white/80">
              Registering for: <span className="text-[#d4af37]">{selectedPlan}</span>
            </p>

            <Field label="Full Name" htmlFor="mem-name">
              <input id="mem-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Jane Doe" />
            </Field>
            <Field label="Phone Number" htmlFor="mem-phone">
              <input id="mem-phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="076 123456" inputMode="tel" />
            </Field>
            <Field label="Email (optional)" htmlFor="mem-email">
              <input id="mem-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="jane@example.com" />
            </Field>
            <Field label="Start Date" htmlFor="mem-start">
              <input id="mem-start" required type="date" min={todayStr} value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </Field>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Registration"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

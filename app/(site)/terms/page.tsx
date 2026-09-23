import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing reservations, pickup orders, payments, and gym memberships at LÖR.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <SectionHeading eyebrow="Legal" title="Terms & Conditions" align="left" />
      <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/70">
        <p className="text-white/50">Last updated: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By using the LÖR website, placing a pickup order, making a reservation, or registering for a
            gym membership, you agree to be bound by these Terms &amp; Conditions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">2. Reservations</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Reservations are confirmed instantly with a unique Digital Reservation Pass.</li>
            <li>Tables are held for 15 minutes past the reserved time before being released to other guests.</li>
            <li>Cancellations should be made at least 3 hours in advance where possible.</li>
            <li>Large parties (10+) may require a deposit, confirmed directly via WhatsApp.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">3. Pickup Orders</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Orders are prepared for the pickup time selected at checkout; please arrive within 15 minutes of that time.</li>
            <li>Prices shown are re-verified server-side at checkout and may differ from stale cached pages.</li>
            <li>Orders paid on pickup are marked &quot;Pending&quot; until settled in person.</li>
            <li>Your Digital Order Invoice is your proof of purchase — present it (digital or printed) at pickup.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">4. Payments</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>We accept Orange Money, Africell Afrimoney, Visa/Mastercard, and cash on arrival.</li>
            <li>Online payments generate a verified Digital Payment Receipt with a unique transaction reference.</li>
            <li>Fraudulent, disputed, or chargeback transactions may result in order cancellation and a report to relevant authorities.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">5. Gym Membership Terms</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Day Passes are valid for a single visit on the selected date only.</li>
            <li>Monthly and VIP memberships renew automatically every 30 days unless cancelled with 48 hours&apos; notice.</li>
            <li>Members must present their Digital Membership Pass at the front desk to activate access.</li>
            <li>LÖR Fitness reserves the right to suspend membership for policy violations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">6. Venue Conduct</h2>
          <p>
            Smart-casual attire is encouraged in the Lounge after 6 PM. Active wear is reserved for the
            fitness floor. LÖR maintains a zero-tolerance policy on disruptive, abusive, or unsafe behavior
            and reserves the right to refuse service or entry.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">7. Liability</h2>
          <p>
            LÖR is not liable for indirect or consequential loss arising from use of our website, services,
            or venue, except where such liability cannot be excluded under Sierra Leonean law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">8. Governing Law</h2>
          <p>These Terms are governed by the laws of the Republic of Sierra Leone.</p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">9. Contact</h2>
          <p>Goderich Road, Freetown, Sierra Leone &middot; +232 90 002000</p>
        </section>
      </div>
    </div>
  );
}

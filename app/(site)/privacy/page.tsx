import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LÖR collects, uses, and protects your personal information across our restaurant, lounge, and fitness services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" align="left" />
      <div className="prose-invert mt-10 space-y-8 text-sm leading-relaxed text-white/70">
        <p className="text-white/50">Last updated: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">1. Introduction</h2>
          <p>
            LÖR (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates a restaurant, lounge, and fitness
            complex on Goderich Road, Freetown, Sierra Leone. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website, place a pickup order,
            make a reservation, or register for a gym membership.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">2. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Name, phone number, and email address for orders, reservations, and memberships.</li>
            <li>Order details, pickup times, and payment method selection.</li>
            <li>Payment confirmation data (transaction reference, amount, timestamp) — we do not store full card numbers.</li>
            <li>Cookie and analytics data, only after you provide consent via our cookie banner.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Process and confirm orders, reservations, and gym memberships.</li>
            <li>Generate digital invoices, reservation passes, and payment receipts.</li>
            <li>Communicate with you regarding your order or booking status via phone, email, or WhatsApp.</li>
            <li>Improve our website and services, and detect fraudulent or spam submissions.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">4. Payment Processing</h2>
          <p>
            Online payments made via Orange Money, Africell Afrimoney, or card are processed through
            third-party payment gateways. We do not store your full card number, PIN, or mobile money
            password. Transaction references are retained for receipt verification and dispute resolution.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">5. Cookies</h2>
          <p>
            We use cookies to remember your preferences and, only with your consent, to measure site
            traffic through privacy-conscious analytics. You may withdraw consent at any time by clearing
            your browser&apos;s local storage for this site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">6. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share limited data with payment processors
            strictly to complete a transaction, and with staff internally to fulfill your order or
            reservation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">7. Data Retention</h2>
          <p>
            Order, reservation, and membership records are retained for as long as necessary to provide our
            services and comply with accounting obligations, after which they are securely deleted.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">8. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data by contacting us via
            WhatsApp at +232 90 002000 or visiting us at Goderich Road, Freetown.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be reflected on this
            page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-xl font-semibold text-white">10. Contact Us</h2>
          <p>Goderich Road, Freetown, Sierra Leone &middot; +232 90 002000</p>
        </section>
      </div>
    </div>
  );
}

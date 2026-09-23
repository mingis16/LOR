import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about LÖR reservations, pickup orders, payment options, gym memberships, parking, and venue policies.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Everything you need to know about reservations, pickup orders, payments, gym memberships, and venue policies."
      />
      <div className="mt-12">
        <Accordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}

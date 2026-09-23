import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReservationForm } from "@/components/reservations/ReservationForm";

export const metadata: Metadata = {
  title: "Table Reservations",
  description:
    "Reserve a table at LÖR Restaurant & Lounge on Goderich Road, Freetown. Instant digital reservation pass with your unique booking reference.",
  alternates: { canonical: "/reservations" },
};

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Restaurant & Lounge"
        title="Reserve Your Table"
        description="Secure your table at LÖR in seconds. You'll receive an instant digital reservation pass to present at arrival."
      />
      <div className="relative mt-12">
        <ReservationForm />
      </div>
    </div>
  );
}

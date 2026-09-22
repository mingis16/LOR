import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassSchedule } from "@/components/gym/ClassSchedule";
import { MembershipSection } from "@/components/gym/MembershipSection";
import { GYM_HOURS } from "@/lib/data";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Fitness & Gym — Classes & Memberships",
  description:
    "LÖR Fitness offers HIIT, Strength, and Yoga classes plus Day Pass, Monthly, and VIP memberships on Goderich Road, Freetown.",
  alternates: { canonical: "/gym" },
};

export default function GymPage() {
  return (
    <div className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="LÖR Fitness"
          title="Classes & Membership Plans"
          description="Sunrise HIIT, strength foundations, and restorative yoga — led by elite coaches on a fully equipped training floor."
        />

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
          <Clock size={16} className="text-[#d4af37]" />
          {GYM_HOURS.map((h, i) => (
            <span key={h.day}>
              {h.day}: {h.hours}
              {i < GYM_HOURS.length - 1 && <span className="mx-2 text-white/20">|</span>}
            </span>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-center font-serif text-2xl font-semibold text-white">Weekly Class Schedule</h2>
          <div className="mt-8">
            <ClassSchedule />
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-serif text-2xl font-semibold text-white">Choose Your Membership</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/60">
            Select a plan and register instantly — you&apos;ll receive a digital booking confirmation pass to
            present at the front desk.
          </p>
          <div className="mt-10">
            <MembershipSection />
          </div>
        </div>
      </div>
    </div>
  );
}

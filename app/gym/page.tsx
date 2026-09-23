import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Dumbbell, Flame, ShieldCheck, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoGrid } from "@/components/ui/PhotoGrid";
import { LinkButton } from "@/components/ui/Button";
import { ClassSchedule } from "@/components/gym/ClassSchedule";
import { MembershipSection } from "@/components/gym/MembershipSection";
import { GYM_HOURS } from "@/lib/data";
import { GYM_HERO, GYM_GALLERY } from "@/lib/images";
import { getGymClasses } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Royal Fitness | Elite Gym & Health Club Freetown",
  description:
    "Royal Fitness at LÖR offers HIIT, Strength, and Yoga classes plus Day Pass, Monthly, and VIP memberships on Goderich Road, Freetown.",
  alternates: { canonical: "/gym" },
};

const STATS = [
  { icon: Dumbbell, label: "Technogym equipment floor" },
  { icon: Flame, label: "HIIT, Strength & Yoga classes" },
  { icon: Users, label: "Personal training available" },
  { icon: ShieldCheck, label: "Ladies-only hours daily" },
];

export default async function GymPage() {
  const gymClasses = await getGymClasses();

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[80vh]">
        <Image
          src={GYM_HERO.src}
          alt={GYM_HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
            Royal Fitness &middot; Goderich Road, Freetown
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Train Like Royalty
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            A full Technogym-equipped training floor, ocean-view cardio, and coach-led classes —
            inside the LÖR complex on Goderich Road.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#memberships" size="lg">
              View Membership Plans
            </LinkButton>
            <LinkButton href="#classes" size="lg" variant="secondary">
              See Class Schedule
            </LinkButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-white/70">
                <Icon size={18} className="shrink-0 text-[#d4af37]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Facility */}
          <div id="about" className="scroll-mt-28">
            <SectionHeading
              eyebrow="The Facility"
              title="A Full Training Floor, Built for Every Goal"
              description="From ocean-view treadmills to a dedicated functional zone and a neon-lit spin studio — Royal Fitness is fully equipped for HIIT, strength, and recovery."
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
            <div className="mt-12">
              <PhotoGrid images={GYM_GALLERY} />
            </div>
          </div>

          {/* Classes */}
          <div id="classes" className="mt-24 scroll-mt-28">
            <h2 className="text-center font-serif text-2xl font-semibold text-white">Weekly Class Schedule</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/60">
              Sunrise HIIT, strength foundations, and restorative yoga — led by elite coaches on a
              fully equipped training floor.
            </p>
            <div className="mt-10">
              <ClassSchedule classes={gymClasses} />
            </div>
          </div>

          {/* Memberships */}
          <div id="memberships" className="mt-24 scroll-mt-28">
            <h2 className="text-center font-serif text-2xl font-semibold text-white">Choose Your Membership</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/60">
              Select a plan and register instantly — you&apos;ll receive a digital booking confirmation pass
              to present at the front desk.
            </p>
            <div className="mt-10">
              <MembershipSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

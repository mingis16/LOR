import type { Metadata } from "next";
import { Star, Flame, Leaf, ArrowRight, Dumbbell } from "lucide-react";
import { SplitHero } from "@/components/home/SplitHero";
import { LocationSection } from "@/components/home/LocationSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { MENU_ITEMS, MEMBERSHIP_OPTIONS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Luxury Restaurant, Lounge & Fitness in Freetown",
  description:
    "Discover LÖR on Goderich Road, Freetown — fine dining, craft cocktails, shisha lounge, and an elite fitness centre. Reserve a table or order online today.",
  alternates: { canonical: "/" },
};

const popularItems = MENU_ITEMS.filter((item) => item.popular).slice(0, 3);

export default function HomePage() {
  return (
    <>
      <SplitHero />

      {/* Menu highlights */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="From the Kitchen"
          title="Signature Dishes & Cocktails"
          description="A preview of what awaits at LÖR Restaurant & Lounge — the full menu is one tap away."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#d4af37]/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 text-white/40">
                  {item.spicy && <Flame size={15} />}
                  {item.vegetarian && <Leaf size={15} />}
                  <Star size={15} className="text-[#d4af37]" fill="#d4af37" />
                </div>
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
              <p className="mt-4 text-lg font-semibold text-[#d4af37]">{formatCurrency(item.price)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/menu" size="lg">
            View Full Menu &amp; Order <ArrowRight size={18} />
          </LinkButton>
        </div>
      </section>

      {/* Gym highlights */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="LÖR Fitness"
            title="Train Like You Mean It"
            description="Three membership tiers built for every goal — from a single visit to full VIP treatment."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {MEMBERSHIP_OPTIONS.map((plan) => (
              <div
                key={plan.plan}
                className={`rounded-2xl border p-7 ${
                  plan.highlight
                    ? "border-[#d4af37]/50 bg-gradient-to-b from-[#d4af37]/10 to-transparent"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <Dumbbell className="text-[#d4af37]" size={28} strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-xl font-semibold text-white">{plan.plan}</h3>
                <p className="mt-1 text-2xl font-bold text-white">
                  {formatCurrency(plan.price)}{" "}
                  <span className="text-sm font-normal text-white/50">{plan.period}</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/65">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <span className="text-[#d4af37]">&bull;</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/gym" size="lg">
              Explore Classes &amp; Join <ArrowRight size={18} />
            </LinkButton>
          </div>
        </div>
      </section>

      <LocationSection />
    </>
  );
}

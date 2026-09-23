"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UtensilsCrossed, Dumbbell, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function SplitHero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.12),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(212,175,55,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[#d4af37]"
        >
          Goderich Road &middot; Freetown
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl"
        >
          Where Fine Dining Meets Elite Training
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65"
        >
          LÖR is Freetown&apos;s only address for a champagne-gold dining lounge and a
          world-class fitness floor, under one roof.
        </motion.p>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-20 sm:px-8 lg:grid-cols-2 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12"
        >
          <Image
            src="/images/restaurant/hero-dining.jpg"
            alt="LÖR rooftop dining terrace overlooking the Freetown coastline"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="relative">
            <UtensilsCrossed className="text-[#d4af37]" size={40} strokeWidth={1.5} />
            <h2 className="mt-6 font-serif text-2xl font-semibold text-white sm:text-3xl">
              LÖR Restaurant &amp; Lounge
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              Chef-crafted mains, hand-shaken cocktails, and a shisha lounge for long nights on
              Goderich Road. Browse the menu, order pickup, or reserve your table.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/menu" size="md">
                Order Online <ArrowRight size={16} />
              </LinkButton>
              <LinkButton href="/reservations" size="md" variant="secondary">
                Reserve a Table
              </LinkButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12"
        >
          <Image
            src="/images/gym/floor-main.jpg"
            alt="Royal Fitness main training floor at LÖR"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="relative">
            <Dumbbell className="text-[#d4af37]" size={40} strokeWidth={1.5} />
            <h2 className="mt-6 font-serif text-2xl font-semibold text-white sm:text-3xl">
              LÖR Fitness &amp; Gym
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
              HIIT, strength, and yoga classes led by elite coaches, plus a full training floor.
              Day passes, monthly, and VIP memberships available.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/gym" size="md">
                View Classes &amp; Plans <ArrowRight size={16} />
              </LinkButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

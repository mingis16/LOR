"use client";

import { useMemo, useState } from "react";
import { Flame, Dumbbell, Flower2 } from "lucide-react";
import { GYM_CLASSES } from "@/lib/data";
import type { GymClass } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<GymClass["type"], typeof Flame> = {
  HIIT: Flame,
  Strength: Dumbbell,
  Yoga: Flower2,
};

const TYPES: (GymClass["type"] | "All")[] = ["All", "HIIT", "Strength", "Yoga"];

export function ClassSchedule() {
  const [active, setActive] = useState<GymClass["type"] | "All">("All");

  const classes = useMemo(
    () => (active === "All" ? GYM_CLASSES : GYM_CLASSES.filter((c) => c.type === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActive(type)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === type
                ? "border-[#d4af37] bg-[#d4af37] text-[#0a0a0a]"
                : "border-white/15 text-white/70 hover:border-[#d4af37]/50 hover:text-white"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {classes.map((cls) => {
          const Icon = TYPE_ICON[cls.type];
          return (
            <div key={cls.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <Icon size={16} /> {cls.type}
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold text-white">{cls.name}</h3>
              <p className="mt-1 text-sm text-white/60">
                {cls.day} &middot; {cls.time}
              </p>
              <p className="mt-2 text-sm text-white/50">with {cls.instructor}</p>
              <p className="mt-3 text-xs text-white/40">{cls.spots} spots per session</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { MENU_ITEMS } from "@/lib/data";
import type { MenuCategory } from "@/lib/types";
import { MenuItemCard } from "./MenuItemCard";
import { cn } from "@/lib/utils";

const CATEGORIES: MenuCategory[] = ["Appetizers", "Mains", "Cocktails", "Shisha & Lounge"];

export function MenuBrowser() {
  const [active, setActive] = useState<MenuCategory | "All">("All");

  const items = useMemo(
    () => (active === "All" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {(["All", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat
                ? "border-[#d4af37] bg-[#d4af37] text-[#0a0a0a]"
                : "border-white/15 text-white/70 hover:border-[#d4af37]/50 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Flame, Leaf, Plus, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { MenuItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#d4af37]/40">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold text-white">{item.name}</h3>
          <div className="flex shrink-0 items-center gap-1.5 pt-1 text-white/40">
            {item.popular && <Star size={14} className="text-[#d4af37]" fill="#d4af37" />}
            {item.spicy && <Flame size={14} />}
            {item.vegetarian && <Leaf size={14} />}
          </div>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{item.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-semibold text-[#d4af37]">{formatCurrency(item.price)}</span>
          <Button size="md" variant="secondary" onClick={() => addItem(item)} aria-label={`Add ${item.name} to cart`}>
            <Plus size={16} /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}

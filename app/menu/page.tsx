import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { OrderWidget } from "@/components/menu/OrderWidget";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Menu & Online Pickup Ordering",
  description:
    "Browse the LÖR menu — appetizers, mains, cocktails, and shisha lounge specials. Order online for pickup with a digital order invoice.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <CartProvider>
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <SectionHeading
          eyebrow="Restaurant & Lounge"
          title="Menu & Online Pickup Ordering"
          description="Browse appetizers, mains, cocktails, and shisha lounge specials. Add items to your cart, choose a pickup time, and pay online or on arrival."
        />
        <div className="mt-12">
          <MenuBrowser />
        </div>
      </div>
      <OrderWidget />
    </CartProvider>
  );
}

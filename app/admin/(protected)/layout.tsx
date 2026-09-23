import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, CalendarClock, Dumbbell, UtensilsCrossed, IdCard, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { signOutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Staff Dashboard | LÖR",
  robots: { index: false, follow: false },
};

const NAV_LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarClock },
  { href: "/admin/memberships", label: "Memberships", icon: IdCard },
  { href: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
  { href: "/admin/gym-classes", label: "Gym Classes", icon: Dumbbell },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#0d0d0d] p-5 md:flex">
        <Link href="/admin" className="mb-8 font-serif text-xl font-semibold tracking-[0.15em] text-white">
          L<span className="text-[#d4af37]">Ö</span>R <span className="text-sm font-sans font-normal text-white/50">Staff</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon size={17} className="text-[#d4af37]" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="truncate px-3 text-xs text-white/40">{user.email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut size={17} className="text-[#d4af37]" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0d0d0d] px-5 py-4 md:hidden">
          <span className="font-serif text-lg font-semibold tracking-[0.15em] text-white">
            L<span className="text-[#d4af37]">Ö</span>R Staff
          </span>
          <form action={signOutAction}>
            <button type="submit" className="text-xs text-white/60 hover:text-white">
              Sign Out
            </button>
          </form>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-white/10 bg-[#0d0d0d] px-3 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs text-white/70 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

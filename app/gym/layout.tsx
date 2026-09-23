import Image from "next/image";
import Link from "next/link";
import { Calendar, ShieldCheck, Phone, MapPin, ArrowLeft, Clock } from "lucide-react";
import { GYM_HOURS } from "@/lib/data";

const GYM_NAV_LINKS = [
  { href: "/gym#about", label: "Facility" },
  { href: "/gym#classes", label: "Class Schedule" },
  { href: "/gym#memberships", label: "Memberships" },
  { href: "/gym#contact", label: "Location" },
];

function InstagramGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#080808] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Dedicated Gym Top Bar & Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101010]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-[#d4af37] sm:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>LÖR Main Site</span>
            </Link>
            <Link
              href="/"
              aria-label="Back to LÖR main site"
              className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:text-[#d4af37] sm:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <Link href="/gym" className="flex items-center gap-2.5">
              <Image
                src="/images/brand/royal-fitness-logo.jpg"
                alt="Royal Fitness"
                width={200}
                height={213}
                className="h-11 w-auto rounded-md object-cover"
                priority
              />
              <div className="hidden sm:block">
                <span className="block text-lg font-black uppercase leading-none tracking-wider text-white">
                  Royal Fitness
                </span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-widest text-[#d4af37]">
                  At LÖR &bull; Freetown
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-300 md:flex">
            {GYM_NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-[#d4af37]">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/gym#memberships"
            className="transform rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg transition-all hover:scale-105 hover:bg-[#c5a059] sm:px-5"
          >
            Join Now
          </a>
        </div>
      </header>

      {/* Main Gym Content Area */}
      <main className="flex-1">{children}</main>

      {/* Gym Dedicated Footer */}
      <footer id="contact" className="border-t border-white/10 bg-[#050505] pb-8 pt-12 text-xs text-gray-400">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Image
                src="/images/brand/royal-fitness-logo.jpg"
                alt="Royal Fitness"
                width={200}
                height={213}
                className="h-8 w-auto rounded object-cover"
              />
              <span className="text-base font-bold tracking-wider text-white">ROYAL FITNESS</span>
            </div>
            <p className="leading-relaxed text-gray-500">
              Freetown&apos;s premier high-performance fitness center located inside the LÖR complex.
              State-of-the-art Technogym conditioning, personal training, and wellness.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com/royalfitness.sl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Royal Fitness on Instagram"
                className="rounded-full border border-white/15 p-2 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <InstagramGlyph />
              </a>
              <a
                href="https://facebook.com/royalfitness.sl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Royal Fitness on Facebook"
                className="rounded-full border border-white/15 p-2 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <FacebookGlyph />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/gym#about" className="hover:text-white">Facility &amp; Equipment</a></li>
              <li><a href="/gym#classes" className="hover:text-white">Group Training Sessions</a></li>
              <li><a href="/gym#memberships" className="hover:text-white">Passes &amp; Rates</a></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-white">
              <Clock className="h-3.5 w-3.5 text-[#d4af37]" /> Gym Operating Hours
            </h4>
            <ul className="space-y-1.5 text-gray-500">
              {GYM_HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}:</span> <span className="text-white">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-gray-500">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" /> Ladies-only hours available &mdash; ask
              at the front desk.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-white">Direct Contact</h4>
            <p className="mb-2 flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4 shrink-0 text-[#d4af37]" /> Goderich Road, Freetown
            </p>
            <p className="mb-2 flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <a href="tel:+23290002000" className="hover:text-[#d4af37]">+232 90 002000</a>
            </p>
            <a
              href="/gym#classes"
              className="mt-3 inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#e8c454]"
            >
              <Calendar className="h-3.5 w-3.5" /> View this week&apos;s classes
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-white/5 px-4 pt-6 text-center text-gray-600 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Royal Fitness at LÖR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

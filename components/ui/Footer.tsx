import Link from "next/link";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { OPERATING_HOURS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-[0.2em] text-white">
              L<span className="text-[#d4af37]">Ö</span>R
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              A luxury restaurant, lounge, and fitness complex on Goderich Road, Freetown — where fine
              dining meets elite training.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LÖR on Instagram"
                className="rounded-full border border-white/15 p-2 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LÖR on Facebook"
                className="rounded-full border border-white/15 p-2 transition-colors hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/menu" className="hover:text-[#d4af37]">Menu &amp; Order Online</Link></li>
              <li><Link href="/reservations" className="hover:text-[#d4af37]">Table Reservations</Link></li>
              <li><Link href="/gym" className="hover:text-[#d4af37]">Fitness &amp; Gym</Link></li>
              <li><Link href="/faq" className="hover:text-[#d4af37]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/privacy" className="hover:text-[#d4af37]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#d4af37]">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#d4af37]" />
                <span>Goderich Road, Freetown, Sierra Leone</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#d4af37]" />
                <a href="tel:+23290002000" className="hover:text-[#d4af37]">+232 90 002000</a>
              </li>
              <li className="flex gap-2.5">
                <Clock size={18} className="mt-0.5 shrink-0 text-[#d4af37]" />
                <span>
                  {OPERATING_HOURS.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LÖR Restaurant, Lounge &amp; Fitness. All rights reserved.</p>
          <p>Goderich Road, Freetown, Sierra Leone</p>
        </div>
      </div>
    </footer>
  );
}

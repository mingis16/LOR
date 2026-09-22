import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { OPERATING_HOURS, GYM_HOURS } from "@/lib/data";

const MAP_QUERY = "Goderich Road, Freetown, Sierra Leone";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

export function LocationSection() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Find Us"
        title="Goderich Road, Freetown"
        description="Easy to find, easy to park. LÖR sits directly along Goderich Road with dedicated on-site parking for diners, lounge guests, and gym members."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-3xl border border-white/10 lg:col-span-3">
          <iframe
            title="LÖR location map — Goderich Road, Freetown"
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 360 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-[#d4af37]" size={22} />
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="mt-1 text-sm text-white/65">Goderich Road, Freetown, Sierra Leone</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Phone className="mt-0.5 shrink-0 text-[#d4af37]" size={22} />
              <div>
                <p className="font-semibold text-white">Call Us</p>
                <a href="tel:+23290002000" className="mt-1 block text-sm text-white/65 hover:text-[#d4af37]">
                  +232 90 002000
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 shrink-0 text-[#d4af37]" size={22} />
              <div className="w-full">
                <p className="font-semibold text-white">Restaurant &amp; Lounge</p>
                <ul className="mt-1 space-y-0.5 text-sm text-white/65">
                  {OPERATING_HOURS.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3">
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-semibold text-white">Fitness &amp; Gym</p>
                <ul className="mt-1 space-y-0.5 text-sm text-white/65">
                  {GYM_HOURS.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3">
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <LinkButton href={MAP_DIRECTIONS_URL} external size="md" variant="secondary" className="w-full">
            <Navigation size={16} /> Get Directions
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

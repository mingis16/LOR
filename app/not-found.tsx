import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

// This is the global fallback for any unmatched route (including under
// /gym), so it renders the main site's chrome directly rather than relying
// on the (site) route group's layout, which this file sits outside of.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
            <Compass className="text-[#d4af37]" size={40} strokeWidth={1.5} />
          </div>
          <p className="mt-8 font-serif text-7xl font-semibold text-white">404</p>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-white sm:text-3xl">
            This Table Isn&apos;t Set
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            The page you&apos;re looking for has wandered off Goderich Road. Let&apos;s get you back to
            the menu, reservations, or the fitness floor.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/" size="md">
              Back to Home
            </LinkButton>
            <LinkButton href="/menu" size="md" variant="secondary">
              View Menu
            </LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

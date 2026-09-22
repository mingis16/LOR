"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";
import { useConsent, setConsent } from "@/lib/consent";

export function CookieConsent() {
  const consent = useConsent();
  const visible = consent === null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 shrink-0 text-[#d4af37]" size={22} />
              <p className="text-sm text-white/75">
                We use cookies to improve your experience, remember preferences, and understand site
                traffic. Read our{" "}
                <Link href="/privacy" className="underline text-[#d4af37] hover:text-[#e8c454]">
                  Privacy Policy
                </Link>{" "}
                to learn more.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button variant="ghost" size="md" onClick={() => setConsent("rejected")}>
                Reject
              </Button>
              <Button variant="primary" size="md" onClick={() => setConsent("accepted")}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

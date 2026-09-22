"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getStoredConsent } from "./CookieConsent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Loads analytics only after the visitor accepts cookies, keeping the site
 * GDPR-friendly by default. Configure via env vars:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lor.example.com
 */
export function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getStoredConsent() === "accepted");
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setConsented(detail === "accepted");
    };
    window.addEventListener("lor-consent-change", handler);
    return () => window.removeEventListener("lor-consent-change", handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {PLAUSIBLE_DOMAIN && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={PLAUSIBLE_DOMAIN}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

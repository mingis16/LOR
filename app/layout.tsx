import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";

const sansBody = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

const serifDisplay = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lor-goderich.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LÖR | Luxury Restaurant, Lounge & Fitness — Goderich Road, Freetown",
    template: "%s | LÖR",
  },
  description:
    "LÖR is a luxury hybrid complex on Goderich Road, Freetown — fine dining, lounge & shisha, craft cocktails, and an elite fitness centre. Reserve a table or order online.",
  keywords: [
    "LÖR",
    "Freetown restaurant",
    "Goderich Road",
    "Sierra Leone fine dining",
    "Freetown lounge",
    "Freetown gym",
    "Freetown fitness",
    "shisha lounge Freetown",
  ],
  authors: [{ name: "LÖR" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "LÖR",
    title: "LÖR | Luxury Restaurant, Lounge & Fitness",
    description:
      "Fine dining, lounge & shisha, craft cocktails, and an elite fitness centre on Goderich Road, Freetown.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LÖR | Luxury Restaurant, Lounge & Fitness",
    description: "Fine dining, lounge & shisha, and an elite fitness centre on Goderich Road, Freetown.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sansBody.variable} ${serifDisplay.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a0a] text-[#f5f5f0]">
        {children}
        <WhatsAppWidget />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}

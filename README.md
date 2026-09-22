# LÖR — Restaurant, Lounge & Fitness

A luxury hybrid complex website for LÖR on Goderich Road, Freetown, Sierra Leone — a
restaurant & lounge with online pickup ordering, table reservations, and an
elite fitness centre with class schedules and membership registration.

Built with Next.js 16 (App Router, TypeScript), Tailwind CSS 4, Framer Motion, and Zod.

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in real values when available
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  Routes (App Router), API routes, and metadata files
  api/                Order, reservation, payment, and membership endpoints
  menu/ reservations/ gym/ faq/ privacy/ terms/
  icon.tsx, apple-icon.tsx, opengraph-image.tsx, manifest.ts, sitemap.ts, robots.ts
components/
  ui/                 Navbar, Footer, buttons, cookie consent, WhatsApp widget, etc.
  menu/                Menu browser, cart, checkout flow
  reservations/       Reservation form
  gym/                Class schedule, membership registration
  receipts/           Printable digital invoice / pass / receipt components
  home/               Homepage sections
lib/                  Types, static data, validation schemas, cart context, utils
```

## Key Features

- **Menu & online pickup ordering** with a cart, checkout, and a printable
  digital Order Invoice (unique order ID, itemized list, totals, pickup time, status).
- **Table reservations** with an instant, printable Digital Reservation Pass.
- **Payments**: Pay Online (Orange Money / Afrimoney / card, currently mocked
  server-side — see `.env.local.example` for where to plug in real gateway
  credentials) or Pay on Pickup/Arrival, with a Digital Payment Receipt for
  online payments.
- **Gym**: weekly class schedule filters and a membership registration flow
  with a printable Digital Membership Pass.
- **Security & anti-fraud**: server-side Zod validation, honeypot fields, and
  per-IP rate limiting on every form-backed API route. Menu prices are always
  re-verified server-side from the catalog, never trusted from the client.
- **Cookie consent** gates analytics (GA / Plausible wrappers, both env-var
  driven and off by default).
- SEO: dynamic metadata per route, generated OG image/favicons via
  `next/og`, `sitemap.xml`, `robots.txt`.

## Notes on photography

Menu, hero, and class imagery currently uses typographic/gradient placeholders
rather than stock photos, since no real photography was supplied. Swap in real
photos via `next/image` (see `lib/data.ts` `MenuItem.image` field, currently
unused by the UI) when available.

## Environment variables

See `.env.local.example`. Payment gateway credentials and the public site URL
are read from environment variables and are never bundled into the client.

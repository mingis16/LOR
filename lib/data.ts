import type { MembershipOption } from "./types";

// Menu items and the gym class schedule now live in Supabase (menu_items /
// gym_classes tables — see supabase/schema.sql and supabase/seed.sql) so
// staff can edit them from /admin without a code deploy. Fetch them via
// lib/supabase/queries.ts (getMenuItems / getGymClasses) instead of a
// static import.

export const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    plan: "Day Pass",
    price: 150,
    period: "per visit",
    perks: ["Full gym floor access", "Locker & towel service", "One guided class"],
  },
  {
    plan: "Monthly",
    price: 950,
    period: "per month",
    perks: ["Unlimited gym access", "Unlimited classes", "Free fitness assessment", "10% off Lounge dining"],
    highlight: true,
  },
  {
    plan: "VIP",
    price: 2400,
    period: "per month",
    perks: ["All Monthly perks", "Personal trainer, 4x/month", "Priority reservations at LÖR Lounge", "Private locker & robe service"],
  },
];

export const OPERATING_HOURS: { day: string; hours: string }[] = [
  { day: "Monday – Thursday", hours: "11:00 AM – 11:00 PM" },
  { day: "Friday – Saturday", hours: "11:00 AM – 2:00 AM" },
  { day: "Sunday", hours: "12:00 PM – 10:00 PM" },
];

export const GYM_HOURS: { day: string; hours: string }[] = [
  { day: "Monday – Friday", hours: "5:30 AM – 10:00 PM" },
  { day: "Saturday – Sunday", hours: "7:00 AM – 8:00 PM" },
];

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "How far in advance should I reserve a table?",
    answer:
      "We recommend booking at least 24 hours ahead, especially for weekend evenings and parties of 6 or more. Same-day reservations are accepted based on availability — check with our team on WhatsApp.",
  },
  {
    question: "What is the reservation cancellation policy?",
    answer:
      "Reservations can be cancelled or rescheduled free of charge up to 3 hours before your booking time. Tables are held for 15 minutes past the reservation time before being released.",
  },
  {
    question: "How long does a pickup order take to prepare?",
    answer:
      "Most pickup orders are ready within 30–45 minutes. You'll select a pickup time at checkout, and your digital invoice will confirm it — please arrive within 15 minutes of your chosen slot.",
  },
  {
    question: "Can I pay when I arrive instead of online?",
    answer:
      "Yes. Choose 'Pay on Pickup/Arrival' at checkout for both food orders and reservations. We accept cash, card, and mobile money on-site.",
  },
  {
    question: "Which mobile money providers do you accept?",
    answer: "We currently accept Orange Money and Africell Afrimoney for online payments, alongside Visa and Mastercard.",
  },
  {
    question: "What are the gym membership terms?",
    answer:
      "Day Passes are valid for a single visit on the date purchased. Monthly and VIP memberships auto-renew every 30 days and can be paused or cancelled anytime with 48 hours' notice before the next billing date.",
  },
  {
    question: "Is there parking available on-site?",
    answer: "Yes, LÖR has secure, complimentary valet and self-park options directly along Goderich Road for both diners and gym members.",
  },
  {
    question: "What is the dress code and venue policy?",
    answer:
      "Smart-casual attire is encouraged in the Lounge after 6 PM. Active wear is reserved for the fitness floor. We operate a zero-tolerance policy on disruptive behavior to ensure a premium experience for all guests.",
  },
];

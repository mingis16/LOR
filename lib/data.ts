import type { GymClass, MembershipOption, MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: "app-01",
    category: "Appetizers",
    name: "Grilled Tiger Prawns",
    description: "Charred jumbo prawns, chili-lime glaze, coconut cream dip.",
    price: 185,
    image: "/images/menu/prawns.jpg",
    popular: true,
    spicy: true,
  },
  {
    id: "app-02",
    category: "Appetizers",
    name: "Plantain & Halloumi Stack",
    description: "Sweet plantain, grilled halloumi, pepper sauce drizzle.",
    price: 120,
    image: "/images/menu/plantain-halloumi.jpg",
    vegetarian: true,
  },
  {
    id: "app-03",
    category: "Appetizers",
    name: "Smoked Fish Croquettes",
    description: "Bonga fish, scotch bonnet aioli, crisp herb crumb.",
    price: 140,
    image: "/images/menu/fish-croquettes.jpg",
    spicy: true,
  },
  // Mains
  {
    id: "main-01",
    category: "Mains",
    name: "LÖR Signature Jollof & Grilled Lobster",
    description: "Smoked jollof rice, butter-poached lobster tail, herb oil.",
    price: 420,
    image: "/images/menu/jollof-lobster.jpg",
    popular: true,
  },
  {
    id: "main-02",
    category: "Mains",
    name: "Wagyu Beef Short Rib",
    description: "24-hour braise, cassava purée, red wine jus.",
    price: 480,
    image: "/images/menu/short-rib.jpg",
    popular: true,
  },
  {
    id: "main-03",
    category: "Mains",
    name: "Groundnut Stew Risotto",
    description: "Slow-cooked peanut stew folded into saffron risotto.",
    price: 260,
    image: "/images/menu/groundnut-risotto.jpg",
    vegetarian: true,
  },
  {
    id: "main-04",
    category: "Mains",
    name: "Pepper Chicken Supreme",
    description: "Free-range chicken breast, roasted pepper sauce, fried yam.",
    price: 240,
    image: "/images/menu/pepper-chicken.jpg",
    spicy: true,
  },
  // Cocktails
  {
    id: "cock-01",
    category: "Cocktails",
    name: "Goderich Sunset",
    description: "Spiced rum, hibiscus, ginger, fresh lime.",
    price: 95,
    image: "/images/menu/goderich-sunset.jpg",
    popular: true,
  },
  {
    id: "cock-02",
    category: "Cocktails",
    name: "Freetown Old Fashioned",
    description: "Bourbon, palm sugar bitters, orange oils.",
    price: 110,
    image: "/images/menu/old-fashioned.jpg",
  },
  {
    id: "cock-03",
    category: "Cocktails",
    name: "LÖR Gold Fizz",
    description: "Gin, elderflower, champagne top, 24k gold leaf.",
    price: 135,
    image: "/images/menu/gold-fizz.jpg",
    popular: true,
  },
  // Shisha & Lounge
  {
    id: "lng-01",
    category: "Shisha & Lounge",
    name: "Double Apple Shisha",
    description: "Classic blend, premium coal, 45-min service.",
    price: 150,
    image: "/images/menu/shisha-apple.jpg",
  },
  {
    id: "lng-02",
    category: "Shisha & Lounge",
    name: "Mint Mojito Shisha",
    description: "Fresh mint and citrus blend, chilled hose.",
    price: 160,
    image: "/images/menu/shisha-mint.jpg",
  },
  {
    id: "lng-03",
    category: "Shisha & Lounge",
    name: "Lounge Sharing Platter",
    description: "Curated bites for the table — chef's selection.",
    price: 320,
    image: "/images/menu/sharing-platter.jpg",
    popular: true,
  },
];

export const GYM_CLASSES: GymClass[] = [
  { id: "cls-01", name: "Sunrise HIIT", type: "HIIT", day: "Monday", time: "6:00 AM", instructor: "Coach Amara", spots: 12 },
  { id: "cls-02", name: "Iron Strength", type: "Strength", day: "Monday", time: "6:00 PM", instructor: "Coach Musa", spots: 15 },
  { id: "cls-03", name: "Flow Yoga", type: "Yoga", day: "Tuesday", time: "7:00 AM", instructor: "Coach Fatmata", spots: 18 },
  { id: "cls-04", name: "HIIT Burn", type: "HIIT", day: "Wednesday", time: "6:00 PM", instructor: "Coach Amara", spots: 12 },
  { id: "cls-05", name: "Power Lifting", type: "Strength", day: "Thursday", time: "6:00 AM", instructor: "Coach Musa", spots: 10 },
  { id: "cls-06", name: "Sunset Yoga", type: "Yoga", day: "Friday", time: "6:00 PM", instructor: "Coach Fatmata", spots: 18 },
  { id: "cls-07", name: "Weekend HIIT", type: "HIIT", day: "Saturday", time: "9:00 AM", instructor: "Coach Amara", spots: 20 },
  { id: "cls-08", name: "Strength Foundations", type: "Strength", day: "Sunday", time: "10:00 AM", instructor: "Coach Musa", spots: 15 },
];

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

import { z } from "zod";

// Sierra Leone mobile numbers: optional +232 / 232 / 0 prefix, then 8 digits
// starting with a valid network prefix (2x, 3x, 7x, 8x, 9x).
const SL_PHONE_REGEX = /^(?:\+232|232|0)?(2[0-5]|3[0-4]|7[0-9]|8[0-8]|9[0-9])\d{6}$/;

// Rejects obvious spam / script-injection patterns without being a WAF.
const SUSPICIOUS_PATTERN = /<script|javascript:|on\w+\s*=|https?:\/\/\S+\.\S+\/\S+\.(exe|zip)/i;

const safeText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Must be at least ${min} characters`)
    .max(max, `Must be under ${max} characters`)
    .refine((v) => !SUSPICIOUS_PATTERN.test(v), "Input contains disallowed content");

export const phoneSchema = z
  .string()
  .trim()
  .regex(SL_PHONE_REGEX, "Enter a valid Sierra Leone phone number (e.g. 076 123456)");

export const emailSchema = z.string().trim().email("Enter a valid email address").optional().or(z.literal(""));

// Honeypot: must always arrive empty. Bots that autofill every field trip this.
export const honeypotSchema = z.string().max(0, "Spam detected");

export const cartLineInputSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
  notes: z.string().max(200).optional(),
});

export const orderSchema = z.object({
  customerName: safeText(2, 60),
  phone: phoneSchema,
  email: emailSchema,
  pickupTime: z.string().min(1, "Select a pickup time"),
  paymentMethod: z.enum(["orange-money", "afrimoney", "card", "pickup"]),
  lines: z.array(cartLineInputSchema).min(1, "Your cart is empty"),
  website: honeypotSchema, // honeypot field
});

export const reservationSchema = z.object({
  guestName: safeText(2, 60),
  phone: phoneSchema,
  email: emailSchema,
  partySize: z.number().int().min(1, "At least 1 guest").max(20, "For groups above 20, call us directly"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  tablePreference: z.enum(["Indoor Lounge", "Outdoor Terrace", "Rooftop Bar", "Private Booth", "No Preference"]),
  specialRequests: z.string().max(300).optional(),
  website: honeypotSchema,
});

export const paymentSchema = z.object({
  orderId: z.string().min(1),
  amount: z.number().positive(),
  method: z.enum(["orange-money", "afrimoney", "card"]),
  customerName: safeText(2, 60),
  phone: phoneSchema,
  momoNumber: z.string().optional(),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((v) => v === "" || /^\d{16}$/.test(v), "Card number must be 16 digits")
    .optional(),
  cardExpiry: z
    .string()
    .refine((v) => v === "" || /^(0[1-9]|1[0-2])\/\d{2}$/.test(v), "Use MM/YY format")
    .optional(),
  cardCvv: z
    .string()
    .refine((v) => v === "" || /^\d{3,4}$/.test(v), "CVV must be 3–4 digits")
    .optional(),
  website: honeypotSchema,
});

export const membershipSchema = z.object({
  fullName: safeText(2, 60),
  phone: phoneSchema,
  email: emailSchema,
  plan: z.enum(["Day Pass", "Monthly", "VIP"]),
  startDate: z.string().min(1, "Select a start date"),
  website: honeypotSchema,
});

export type OrderInput = z.infer<typeof orderSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type MembershipInput = z.infer<typeof membershipSchema>;

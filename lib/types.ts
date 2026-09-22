// Shared domain types for the LÖR website

export type MenuCategory = "Appetizers" | "Mains" | "Cocktails" | "Shisha & Lounge";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number; // in SLE (Leones)
  image: string;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type PaymentMethod = "orange-money" | "afrimoney" | "card" | "pickup";

export type PaymentStatus = "paid" | "pending";

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
}

export interface OrderInvoiceData {
  orderId: string;
  customer: OrderCustomer;
  lines: { id: string; name: string; quantity: number; price: number; lineTotal: number }[];
  subtotal: number;
  serviceFee: number;
  total: number;
  pickupTime: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface PaymentReceiptData {
  transactionRef: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  paidAt: string;
  customerName: string;
}

export type TablePreference = "Indoor Lounge" | "Outdoor Terrace" | "Rooftop Bar" | "Private Booth" | "No Preference";

export interface ReservationData {
  bookingRef: string;
  guestName: string;
  phone: string;
  email?: string;
  partySize: number;
  date: string;
  time: string;
  tablePreference: TablePreference;
  specialRequests?: string;
  createdAt: string;
}

export type MembershipPlan = "Day Pass" | "Monthly" | "VIP";

export interface MembershipData {
  membershipId: string;
  fullName: string;
  phone: string;
  email?: string;
  plan: MembershipPlan;
  startDate: string;
  createdAt: string;
}

export interface GymClass {
  id: string;
  name: string;
  type: "HIIT" | "Strength" | "Yoga";
  day: string;
  time: string;
  instructor: string;
  spots: number;
}

export interface MembershipOption {
  plan: MembershipPlan;
  price: number;
  period: string;
  perks: string[];
  highlight?: boolean;
}

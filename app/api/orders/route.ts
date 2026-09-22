import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import { MENU_ITEMS } from "@/lib/data";
import type { OrderInvoiceData } from "@/lib/types";

const SERVICE_FEE_RATE = 0.02;

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`order:${identifier}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { customerName, phone, email, pickupTime, paymentMethod, lines } = parsed.data;

  // Re-price server-side from the menu catalog — never trust client-submitted prices.
  const resolvedLines: { name: string; quantity: number; price: number; lineTotal: number }[] = [];
  for (const line of lines) {
    const menuItem = MENU_ITEMS.find((m) => m.id === line.itemId);
    if (!menuItem) {
      return NextResponse.json({ error: `Unknown menu item: ${line.itemId}` }, { status: 400 });
    }
    resolvedLines.push({
      name: menuItem.name,
      quantity: line.quantity,
      price: menuItem.price,
      lineTotal: menuItem.price * line.quantity,
    });
  }

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const total = subtotal + serviceFee;

  const invoice: OrderInvoiceData = {
    orderId: generateReference("ORD"),
    customer: { name: customerName, phone, email: email || undefined },
    lines: resolvedLines,
    subtotal,
    serviceFee,
    total,
    pickupTime,
    paymentMethod,
    status: paymentMethod === "pickup" ? "pending" : "paid",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ invoice }, { status: 201 });
}

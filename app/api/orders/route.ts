import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/service";
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
  const supabase = createServiceRoleClient();

  // Re-price server-side from the menu catalog — never trust client-submitted prices.
  const itemIds = lines.map((l) => l.itemId);
  const { data: menuRows, error: menuError } = await supabase
    .from("menu_items")
    .select("id, name, price")
    .in("id", itemIds);

  if (menuError) {
    console.error("orders: failed to load menu items:", menuError.message);
    return NextResponse.json({ error: "Could not place your order. Please try again." }, { status: 500 });
  }

  const menuById = new Map(menuRows.map((m) => [m.id, m]));
  const resolvedLines: OrderInvoiceData["lines"] = [];
  for (const line of lines) {
    const menuItem = menuById.get(line.itemId);
    if (!menuItem) {
      return NextResponse.json({ error: `Unknown menu item: ${line.itemId}` }, { status: 400 });
    }
    const price = Number(menuItem.price);
    resolvedLines.push({
      id: menuItem.id,
      name: menuItem.name,
      quantity: line.quantity,
      price,
      lineTotal: price * line.quantity,
    });
  }

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const total = subtotal + serviceFee;
  const orderId = generateReference("ORD");
  // Card / mobile money orders are marked paid once /api/payments confirms
  // the charge; pickup orders are settled in person, so they start pending
  // and stay that way until fulfilled.
  const status: OrderInvoiceData["status"] = "pending";

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_ref: orderId,
      customer_name: customerName,
      phone,
      email: email || null,
      pickup_time: pickupTime,
      payment_method: paymentMethod,
      payment_status: status,
      subtotal,
      service_fee: serviceFee,
      total,
    })
    .select("id")
    .single();

  if (orderError || !orderRow) {
    console.error("orders: failed to insert order:", orderError?.message);
    return NextResponse.json({ error: "Could not place your order. Please try again." }, { status: 500 });
  }

  const { error: linesError } = await supabase.from("order_lines").insert(
    resolvedLines.map((l) => ({
      order_id: orderRow.id,
      menu_item_id: l.id,
      name: l.name,
      quantity: l.quantity,
      price: l.price,
      line_total: l.lineTotal,
    }))
  );

  if (linesError) {
    console.error("orders: failed to insert order lines:", linesError.message);
    return NextResponse.json({ error: "Could not place your order. Please try again." }, { status: 500 });
  }

  const invoice: OrderInvoiceData = {
    orderId,
    customer: { name: customerName, phone, email: email || undefined },
    lines: resolvedLines,
    subtotal,
    serviceFee,
    total,
    pickupTime,
    paymentMethod,
    status,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ invoice }, { status: 201 });
}

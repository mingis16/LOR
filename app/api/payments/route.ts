import { NextResponse } from "next/server";
import { paymentSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/service";
import type { PaymentReceiptData } from "@/lib/types";

/**
 * Simulated payment processing. Swap the branches below for real gateway
 * calls once credentials are available in .env.local:
 *   - Orange Money:   ORANGE_MONEY_API_KEY / ORANGE_MONEY_API_URL
 *   - Afrimoney:      AFRIMONEY_API_KEY / AFRIMONEY_API_URL
 *   - Card (Visa/MC): CARD_GATEWAY_SECRET_KEY / CARD_GATEWAY_API_URL
 */
export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`payment:${identifier}`);
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

  const parsed = paymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { orderId, amount, method, customerName, payerReference } = parsed.data;
  const supabase = createServiceRoleClient();

  const { data: orderRow, error: orderLookupError } = await supabase
    .from("orders")
    .select("id")
    .eq("order_ref", orderId)
    .single();

  if (orderLookupError || !orderRow) {
    return NextResponse.json({ error: "We couldn't find that order. Please start over." }, { status: 404 });
  }

  // TODO: replace with a real gateway call using the env vars documented above.
  // This mock always succeeds so the ordering/reservation flow can be demoed end-to-end.
  const transactionRef = generateReference("TXN");
  const paidAt = new Date().toISOString();

  const { error: paymentError } = await supabase.from("payments").insert({
    transaction_ref: transactionRef,
    order_id: orderRow.id,
    amount,
    method,
    customer_name: customerName,
    payer_reference: payerReference || null,
    paid_at: paidAt,
  });

  if (paymentError) {
    console.error("payments: failed to insert payment:", paymentError.message);
    return NextResponse.json({ error: "Payment failed. Please try again." }, { status: 500 });
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({ payment_status: "paid" })
    .eq("id", orderRow.id);

  if (updateError) {
    console.error("payments: failed to mark order paid:", updateError.message);
    // The payment itself succeeded and was recorded — don't fail the request
    // over a status-sync issue; staff can correct it from /admin.
  }

  const receipt: PaymentReceiptData = {
    transactionRef,
    orderId,
    amount,
    method,
    paidAt,
    customerName,
    payerReference,
  };

  return NextResponse.json({ receipt }, { status: 201 });
}

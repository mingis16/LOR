import { NextResponse } from "next/server";
import { paymentSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
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

  // TODO: replace with a real gateway call using the env vars documented above.
  // This mock always succeeds so the ordering/reservation flow can be demoed end-to-end.
  const receipt: PaymentReceiptData = {
    transactionRef: generateReference("TXN"),
    orderId,
    amount,
    method,
    paidAt: new Date().toISOString(),
    customerName,
    payerReference,
  };

  return NextResponse.json({ receipt }, { status: 201 });
}

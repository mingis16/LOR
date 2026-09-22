import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import type { ReservationData } from "@/lib/types";

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`reservation:${identifier}`);
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

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { guestName, phone, email, partySize, date, time, tablePreference, specialRequests } = parsed.data;

  const requestedDate = new Date(`${date}T${time || "00:00"}`);
  if (Number.isNaN(requestedDate.getTime()) || requestedDate < new Date(Date.now() - 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Please select a valid future date and time" }, { status: 400 });
  }

  const reservation: ReservationData = {
    bookingRef: generateReference("RES"),
    guestName,
    phone,
    email: email || undefined,
    partySize,
    date,
    time,
    tablePreference,
    specialRequests: specialRequests || undefined,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ reservation }, { status: 201 });
}

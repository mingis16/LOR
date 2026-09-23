import { NextResponse } from "next/server";
import { membershipSchema } from "@/lib/validation";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import { createServiceRoleClient } from "@/lib/supabase/service";
import type { MembershipData } from "@/lib/types";

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  const rateLimit = checkRateLimit(`membership:${identifier}`);
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

  const parsed = membershipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { fullName, phone, email, plan, startDate } = parsed.data;
  const membershipId = generateReference("MEM");
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("memberships").insert({
    membership_id: membershipId,
    full_name: fullName,
    phone,
    email: email || null,
    plan,
    start_date: startDate,
  });

  if (error) {
    console.error("memberships: failed to insert membership:", error.message);
    return NextResponse.json({ error: "Could not complete registration. Please try again." }, { status: 500 });
  }

  const membership: MembershipData = {
    membershipId,
    fullName,
    phone,
    email: email || undefined,
    plan,
    startDate,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ membership }, { status: 201 });
}

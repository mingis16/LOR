import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function adminAllowlist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminAllowlist().includes(email.toLowerCase());
}

/**
 * Verifies the current request has an authenticated Supabase session whose
 * email is on the ADMIN_EMAILS allowlist. Redirects to /admin/login if not.
 * Call this at the top of every admin page, layout, and server action —
 * middleware.ts guards navigations, but actions can be invoked directly, so
 * each one re-checks independently (defense in depth).
 */
export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login");
  }

  return user;
}

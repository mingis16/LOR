import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/**
 * Cookie-aware Supabase client for Server Components, Route Handlers, and
 * Server Actions. Uses the anon key + the visitor's session cookie — only
 * has whatever access that visitor's auth session grants (i.e. none, for
 * the transactional tables, since RLS locks those to service_role). Used
 * to read/refresh the admin's login session, never to touch customer data.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component render — middleware handles the
            // actual cookie refresh on navigation, so this is safe to ignore.
          }
        },
      },
    }
  );
}

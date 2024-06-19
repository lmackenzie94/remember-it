import {
  createServerClient as createClient,
  type CookieOptions
} from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from '@/supabase.d';

export const createServerClient = () => {
  const cookieStore = cookies();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // ? in a browser, accessing/writing cookies is always the same.
      // ? on a server, the only commonality is that cookies are transmitted via HTTP headers.
      // ? BUT, how to access HTTP headers can differ between frameworks (remember, @supabase/ssr is not Next.js specific)
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // ? ^ Server Components cannot set cookies
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // ? ^ Server Components cannot delete cookies
          }
        }
      }
    }
  );
};

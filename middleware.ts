import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

// ? Since Server Components can't write cookies (only reads them), you need middleware to refresh expired Auth tokens and store them.

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

//* This can be modified to not include routes that don't access Supabase
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware if static export is enabled (middleware doesn't work with static export)
  // In dev mode (NODE_ENV === 'development'), static export is disabled, so middleware works fine
  const isStaticExport = process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT !== 'false';
  
  if (isStaticExport) {
    return NextResponse.next();
  }

  // Only force redirect to HTTPS in production environment; don't handle in local development to avoid localhost certificate issues
  if (process.env.NODE_ENV === 'production') {
    if (request.headers.get('x-forwarded-proto') === 'http') {
      const host = request.headers.get('host');
      if (host) {
        const url = request.nextUrl.clone();
        url.protocol = 'https:';
        url.host = host;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

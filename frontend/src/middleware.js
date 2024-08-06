import { NextResponse } from 'next/server';
import { getAuthSession } from '../utils/auth/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = await getAuthSession(request);

  const publicRoutes = ['/'];

  if (!publicRoutes.includes(pathname) && !session) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/form/:path*', '/review/[id]/:path*', '/video/[id]/:path*']
};
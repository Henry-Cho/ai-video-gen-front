import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function GET(req) {
  const url = new URL(req.url, `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`);
  const pathname = url.searchParams.get('pathname');
  const token = cookies().get('auth-token');

  if (!token) {
    if (pathname === '/') {
      return new Response(JSON.stringify({ user: null }), { status: 200 });
    }
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const decoded = await jose.jwtVerify(token.value, secret);

    return new Response(JSON.stringify({ user: decoded.payload }), { status: 200 });
  } catch (error) {
    console.error('Invalid token:', error);
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }
}

import { cookies } from 'next/headers';
import * as jose from 'jose'

export async function getAuthSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const session = await validateToken(token);
  return session;
}

async function validateToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const decoded = await jose.jwtVerify(token, secret);
    return { user: decoded };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function GET(req) {
  const url = new URL(req.url, `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`);
  const pathname = url.searchParams.get('pathname');
  const refreshToken = cookies().get('refresh-token');

  if (!refreshToken) {
    if (pathname === '/') {
      return new Response(JSON.stringify({ user: null }), { status: 200 });
    }
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }

  try {
    const newTokens = await refreshTokens(refreshToken.value);
    return new Response(JSON.stringify({ user: newTokens.user }), { status: 200 });
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return new Response(JSON.stringify({ user: null }), { status: 401 });
  }
}

async function refreshTokens(refreshToken) {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  try {
    const { payload } = await jose.jwtVerify(refreshToken, secret);

    const newAccessToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    const newRefreshToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    return { access_token: newAccessToken, refresh_token: newRefreshToken, user: payload };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}
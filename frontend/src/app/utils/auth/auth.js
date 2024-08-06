import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getAuthSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  const session = validateToken(token);
  return session;
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
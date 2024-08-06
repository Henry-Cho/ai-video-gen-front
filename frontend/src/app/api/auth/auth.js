import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import cookie from 'js-cookie';

const fixedSalt = '$2b$10$abcdefghijklmnopqrstuv';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Function to hash a password
async function hashPassword(password) {
  try {
      const hashedPassword = await bcrypt.hash(password, fixedSalt);
      return hashedPassword;
  } catch (error) {
      throw new Error('Error hashing password');
  }
}

export async function signUpNewUser(email, password, username) {

  const hashedPassword = await hashPassword(password);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: hashedPassword,
    options: {
      data: {
        username: username,
      },
    },
  });

  await supabase.from('users').insert({
    id: data.user.id,
    username: username,
    email: email,
    encrypted_password: hashedPassword,
  });

  if (error) {
    console.error('Error signing up:', error);
    return { error };
  }

  return { data };
}

export async function signInWithEmail(email, password) {
  const hashedPassword = await hashPassword(password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: hashedPassword,
  });

  if (error) {
    console.error('Error signing in:', error);
    return { error };
  }

  const userId = data.user.id;
  const { data: userInfo, error: userInfoError } = await supabase
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();

  if (userInfoError) {
    console.error('Error fetching user info:', userInfoError);
    return { error: userInfoError };
  }

  // 로그인 시 가져온 사용자 정보를 user_metadata에 추가 
data.user.user_metadata = { username: userInfo.username };

  return { data };
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return session;
};

// sign out 함수 
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return { error };
  }
  // Delete Cookies 
  cookie.remove('auth-token');
  return { message: "Successfully signed out" };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });

  if (error) {
    console.error('Error signing in with Google:', error);
    return { error };
  }
  // 로그인 성공 시 쿠키 설정
  document.cookie = "loggedIn=true; path=/";

  return { data };
}

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user data:', error);
    return { error };
  }

  await supabase.from('users').insert({
    id: data.user.id,
    username: data.user.user_metadata.name,
    email: data.user.email,
  });

  return { data };
}

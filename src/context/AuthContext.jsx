'use client';

import { signOutUser } from '@/app/api/auth/auth';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const currentLocation = window.location.pathname;
      const response = await fetch(`/api/auth/session?pathname=${currentLocation}`);
      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      } else {
        const refreshResponse = await fetch(`/api/auth/refresh?pathname=${currentLocation}`);
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setUser(refreshData.user);
        } else if (currentLocation !== '/') {
          router.push('/');
        }
      }
      setLoading(false);
    };
  
    checkSession();
  }, [router, pathname]);
  
  

  const signOut = async () => {
    const { error } = await signOutUser();
    if (!error) {
      setUser(null);
      router.push('/');
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await signInWithEmail(email, password);
    if (!error) {
      setUser(data.user);
    }
  };

  const signUp = async (email, password, username) => {
    const { data, error } = await signUpNewUser(email, password, username);
    if (!error) {
      setUser(data.user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut, signIn, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
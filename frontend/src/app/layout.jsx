"use client";

import { Inter } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import Sidebar from './components/Sidebar';
import SigninForm from './components/SigninForm';
import SigninModal from './components/SigninModal';
import SignupForm from './components/SignupForm';
import SignupModal from './components/SignupModal';
import UserMenu from './components/UserMenu'; // 임포트
import "./globals.css";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleSignInClick = () => {
    setIsSigninModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignupModalOpen(true);
    setIsSigninModalOpen(false);
  };

  const handleCloseSigninModal = () => {
    setIsSigninModalOpen(false);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
  };

  function AuthenticatedLayout({ children }) {
    const { user, loading, signOut } = useAuth();
  
    if (loading) {
      return <Loading />;
    }

    const usernameContainer = user?.user_metadata || user?.payload?.user_metadata || {};
    const username = usernameContainer.username || "User";
    const firstLetter = username.charAt(0).toUpperCase();

    return (
      <>
        <Suspense fallback={<Loading />}>
          <div className="flex-1 overflow-auto">
            {/* User Menu */}
            {isUserMenuOpen && (
              <UserMenu user={user} signOut={signOut} onClose={handleCloseUserMenu} onRemoveProfileImage={handleRemoveProfileImage} />
            )}
            
            {/* Sign In/Out Button */}
            <div className="absolute top-5 right-5 mr-5 z-50 flex items-center space-x-4">
              {user ? (
                <div
                  className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full text-white cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg hover:bg-gray-600"
                  onClick={handleUserMenuClick}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    firstLetter
                  )}
                </div>
              ) : (
                <button
                  className="rounded-lg py-2 px-4 text-white bg-gradient-to-r from-[#3F46FF] to-[#EB3333]"
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Modals */}
            <SigninModal isOpen={isSigninModalOpen} onClose={handleCloseSigninModal}>
              <SigninForm handleSignUpClick={handleSignUpClick} onClose={handleCloseSigninModal}/>
            </SigninModal>
            <SignupModal isOpen={isSignupModalOpen} onClose={handleCloseSignupModal}>
              <SignupForm handleSignInClick={handleSignInClick} onClose={handleCloseSignupModal}/>
            </SignupModal>
            <Sidebar />
            {children}
          </div>
        </Suspense>
      </>
    );
  }

  return (
    <html lang="en" className="h-full">
      <body className={`bg-custom-gradient ${inter.className} h-full flex flex-col`}>
        <AuthProvider>
          <UserProvider>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

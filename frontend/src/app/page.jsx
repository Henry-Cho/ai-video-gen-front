"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from "../context/AuthContext"
import { getUserData } from './api/auth/auth';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    const images = document.querySelectorAll('.grid img');
    images.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.1}s`;
      img.classList.add('fade-in');
    });

    // 쿠키 확인 및 fetchData 호출
    if (document.cookie.includes('loggedIn=true')) {
      fetchData();
      // 쿠키 삭제
      document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, []);

  const fetchData = async () => {
    const { error } = await getUserData();
    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }
  };

  // const handleGetStarted = () => {
  //   router.push('/signin?redirect=/form');
  // };

  const handleGetStarted = () => {
    if (!user) {
      alert("You need to sign in first before accessing a form!");
      return;
    }
    router.push("/form");
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-20 min-h-screen relative">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-full justify-center items-center">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-start p-8 text-black w-full md:w-2/3 md:mr-10">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#DE62B4] to-[#56E364] bg-clip-text text-transparent">
            AI Product Marketing Video Generator
          </h1>
          <h2 className="text-3xl mb-8 bg-gradient-to-r from-[#5B5B5B] to-[#979797] bg-clip-text text-transparent">
            Create, Edit, and Share AI-Generated Videos
          </h2>
          <p className="mb-20 text-[#BCBCBC]">
            You input your product details; we generate customized marketing videos using advanced AI technologies like LLM, Vision, and Video.
          </p>
          <button
            className='rounded-lg py-2 px-8 w-full md:w-2/4 text-white bg-gradient-to-r from-[#3F46FF] to-[#EB3333]'
            onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-8 md:mt-0">
          <div className="w-full h-full flex justify-center items-center">
            <video
              className="w-full h-auto rounded-lg"
              loop
              muted
              autoPlay
              src="/video/sample.mp4"
              style={{ maxWidth: '90%', height: 'auto' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Instruction */}
      <div className="w-full max-w-7xl mt-48">
        <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-[#DE62B4] to-[#56E364] bg-clip-text text-transparent">
          How it works: Step-by-Step Guide
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-10">
          {/* Input Section */}
          <div className="relative flex flex-col items-left p-4 text-left w-full md:w-1/3 h-96 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#196267] to-[#21855B] rounded-lg opacity-50"></div>
            <div className="relative z-10 w-full h-64 mb-4 flex justify-center items-center overflow-hidden rounded-lg">
              <img src="/images/MainPage/input.png" alt="Input" className="object-contain h-full" style={{ borderRadius: '0.5rem' }} />
            </div>
            <h3 className="relative z-10 text-2xl font-semibold text-white mb-2">Input</h3>
            <p className="relative z-10 text-white">Upload product pictures, add a title and description, and specify the product size.</p>
          </div>
          {/* Review & Edit Section */}
          <div className="relative flex flex-col items-left p-4 text-left w-full md:w-1/3 h-96 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A4D51] to-[#679A84] rounded-lg opacity-50"></div>
            <div className="relative z-10 w-full h-64 mb-4 flex justify-center items-center overflow-hidden rounded-lg">
              <img src="/images/MainPage/review&edit.png" alt="Review & Edit" className="object-contain h-full" style={{ borderRadius: '0.5rem' }} />
            </div>
            <h3 className="relative z-10 text-2xl font-semibold text-white mb-2">Review & Edit</h3>
            <p className="relative z-10 text-white">Edit video details, including subtitle, dubbing, and background music (BGM).</p>
          </div>
          {/* Export Section */}
          <div className="relative flex flex-col items-left p-4 text-left w-full md:w-1/3 h-96 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A858C] to-[#3BE19B] rounded-lg opacity-50"></div>
            <div className="relative z-10 w-full h-64 mb-4 flex justify-center items-center overflow-hidden rounded-lg">
              <img src="/images/MainPage/export.png" alt="Export" className="object-contain h-full" style={{ borderRadius: '0.5rem' }} />
            </div>
            <h3 className="relative z-10 text-2xl font-semibold text-white mb-2">Export</h3>
            <p className="relative z-10 text-white">Export your completed video to your streaming websites.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

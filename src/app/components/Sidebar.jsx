'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full flex flex-col bg-gray-800 text-white p-4 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button onClick={toggleSidebar} className='text-white mb-4 self-end'>
          Close
        </button>
        <div className='text-2xl font-bold mb-4'>Mock Logo</div>
        <form className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='Main Page'
            className='p-2 rounded-l-md'
          />
          <button type='submit' className='p-2 bg-blue-500 rounded-r-md'>
            Search
          </button>
        </form>
        <Link href='/storage' className='p-2 bg-blue-500 rounded'>
          Storage
        </Link>
      </div>
      {/* Hamburger button */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className='p-2 bg-gray-800 text-white rounded fixed top-4 left-4 z-50'
        >
          ☰
        </button>
      )}
    </div>
  );
}

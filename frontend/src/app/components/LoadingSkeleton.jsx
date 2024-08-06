import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-60 animate-ping"></div>
        <div className="absolute w-full h-full rounded-full bg-blue-500 opacity-60 animate-ping animation-delay-1000"></div>
      </div>
    </div>
  );
}

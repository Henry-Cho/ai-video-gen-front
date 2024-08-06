import React from 'react';
import { Circles } from 'react-loader-spinner';

const LoadingStatus = ({ apiCalls }) => {
  const totalCalls = 6;
  const completedCalls = apiCalls.filter(call => !call.isLoading).length;
  
  const progressPercentage = (completedCalls / totalCalls) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen fixed top-0 left-0 z-50">
      {apiCalls.map((call, index) => (
        <div key={index} className="flex items-center space-x-2 my-2 text-white">
          <span>{call.name}</span>
          {call.isLoading ? (
            <Circles height="20" width="20" color="#fff" ariaLabel="loading" />
          ) : call.isError ? (
            <span className="error">❌</span>
          ) : (
            <span className="check">✅</span>
          )}
          {call.responseTime && <span>({call.responseTime} ms)</span>}
        </div>
      ))}
      <div className="w-1/4 bg-gray-200 rounded-full h-6 mb-4 relative">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">
          {`${progressPercentage.toFixed(2)}%`}
        </span>
      </div>
    </div>
  );
};

export default LoadingStatus;

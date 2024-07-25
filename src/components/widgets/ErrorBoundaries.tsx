import React from 'react';
import Image from 'next/image';

interface ErrorBoundariesProps {
  error: Error | null;
  onRetry: () => void;
}

export const ErrorBoundaries = ({ error, onRetry }: ErrorBoundariesProps) => {
  return (
    <div className="bg-red-50 h-screen w-full flex flex-col items-center justify-center space-y-4">
      <Image 
        src="/writer.svg" 
        alt="Error" 
        priority
        width={250}
        height={250}
      />
      <h2 className="text-red-700 font-medium text-sm md:text-lg text-center mx-4">
        {'<'}We are sorry but we are experiencing instability in our application{'/>'}
      </h2>
      <p className="bg-red-600 text-white font-medium px-4 py-2 text-center flex items-center gap-1 text-sm rounded">
        Details: {error?.message}
      </p>
      <button 
        type="button" 
        onClick={onRetry}
        className="flex items-center justify-center gap-1 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Try again?
      </button>
    </div>
  );
}
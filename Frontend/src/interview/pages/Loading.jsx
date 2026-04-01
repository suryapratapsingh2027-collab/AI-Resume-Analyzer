import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm z-50">
      {/* Main Card */}
      <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col items-center max-w-xs w-full backdrop-blur-md">
        
        {/* Spinner Outer Ring */}
        <div className="relative w-20 h-20">
          {/* Static Background Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
          
          {/* Animated Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-blue-500 animate-spin"></div>
          
          {/* Inner Glowing Pulse */}
          <div className="absolute inset-3 rounded-full bg-blue-500/10 animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            Loading...
          </h3>
          <p className="text-sm text-slate-400 mt-1 animate-pulse">
            Please wait a moment
          </p>
        </div>

        {/* Subtle Decorative Dots */}
        <div className="flex space-x-1.5 mt-4">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
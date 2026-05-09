// Loader Component
// Loading spinner displayed during async operations

import React from 'react';

const Loader = ({ size = 'medium', fullScreen = false }) => {
  // Size classes
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  const spinnerClass = sizeClasses[size] || sizeClasses.medium;

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <div
            className={`${spinnerClass} border-primary-500 border-t-transparent rounded-full animate-spin mx-auto`}
          ></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Inline loader
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`${spinnerClass} border-primary-500 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;

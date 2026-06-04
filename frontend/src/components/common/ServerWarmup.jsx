// Server Warmup Component
// Checks if backend is ready before loading app

import React, { useState, useEffect } from 'react';
import healthService from '../../services/healthService';
import Loader from './Loader';

const ServerWarmup = ({ children }) => {
  const [isServerReady, setIsServerReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 20; // Max 20 attempts (60 seconds with 3 second intervals)

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      setAttempts(prev => prev + 1);
      
      console.log(`🔍 Checking server health... (Attempt ${attempts + 1}/${maxAttempts})`);
      
      const response = await healthService.pingServer();
      
      if (response && response.status === 'healthy') {
        console.log('✅ Server is ready!');
        setIsServerReady(true);
        setIsChecking(false);
      } else {
        retryCheck();
      }
    } catch (error) {
      console.log('⚠️ Server not ready yet, retrying...');
      retryCheck();
    }
  };

  const retryCheck = () => {
    if (attempts < maxAttempts) {
      // Retry after 3 seconds
      setTimeout(() => {
        checkServerHealth();
      }, 3000);
    } else {
      // Max attempts reached, let app load anyway
      console.log('⏱️ Max attempts reached, loading app...');
      setIsServerReady(true);
      setIsChecking(false);
    }
  };

  if (isChecking && !isServerReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <div className="mt-6 space-y-2">
            <p className="text-lg font-semibold text-gray-800">
              Starting server...
            </p>
            <p className="text-sm text-gray-600">
              Attempt {attempts} of {maxAttempts}
            </p>
            {attempts > 3 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
                <p className="text-sm text-blue-800">
                  <strong>⏱️ First time loading?</strong>
                  <br />
                  The backend server sleeps after 15 minutes of inactivity.
                  <br />
                  It's waking up now, this usually takes 30-60 seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ServerWarmup;

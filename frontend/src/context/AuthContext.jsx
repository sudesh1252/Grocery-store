// Authentication Context
// Global state management for user authentication

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, getStoredUser, setToken, setStoredUser, removeToken } from '../utils/helpers';
import authService from '../services/authService';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const initAuth = () => {
      const token = getToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      
      // Store token and user data
      setToken(response.token);
      setStoredUser(response.user);
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Signup function
   * @param {object} userData - User registration data
   */
  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      
      // Store token and user data
      setToken(response.token);
      setStoredUser(response.user);
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    // Clear storage
    removeToken();
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    // Call service logout
    authService.logout();
  };

  /**
   * Update user data
   * @param {object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

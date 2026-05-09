// Authentication Service
// Handles all authentication-related API calls

import api from './api';

const authService = {
  /**
   * Register new user
   * @param {object} userData - User registration data
   * @returns {Promise} API response
   */
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   * @param {object} credentials - Email and password
   * @returns {Promise} API response with token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get current logged-in user
   * @returns {Promise} User data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user (client-side only)
   * Clears token from localStorage
   */
  logout: () => {
    localStorage.removeItem('shree_grocery_token');
    localStorage.removeItem('shree_grocery_user');
  },
};

export default authService;

// API Service - Axios Configuration
// Centralized API communication setup

import axios from 'axios';
import { API_URL } from '../utils/constants';
import { getToken, removeToken } from '../utils/helpers';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
// Automatically adds JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// Handles common response scenarios
api.interceptors.response.use(
  (response) => {
    // Return only the data part of response
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Handle 401 Unauthorized - Token expired or invalid
      if (status === 401) {
        removeToken();
        window.location.href = '/login';
      }

      // Return error message from server
      return Promise.reject(data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject('Network error. Please check your connection.');
    } else {
      // Something else happened
      return Promise.reject(error.message || 'An error occurred');
    }
  }
);

export default api;

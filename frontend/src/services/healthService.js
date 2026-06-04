// Health Service
// Checks backend server health and warms it up

import axios from 'axios';
import { API_URL } from '../utils/constants';

const healthService = {
  /**
   * Ping the backend server to check if it's alive
   * and warm it up if it's sleeping
   */
  pingServer: async () => {
    try {
      const baseURL = API_URL.replace('/api', ''); // Remove /api to get base URL
      const response = await axios.get(`${baseURL}/health`, {
        timeout: 60000, // 60 second timeout for cold start
      });
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  /**
   * Check if server is ready (non-blocking)
   */
  isServerReady: async () => {
    try {
      const baseURL = API_URL.replace('/api', '');
      const response = await axios.get(`${baseURL}/health`, {
        timeout: 5000, // 5 second timeout
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};

export default healthService;

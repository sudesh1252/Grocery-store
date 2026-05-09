// Report Service
// Handles all report-related API calls

import api from './api';

const reportService = {
  /**
   * Get daily sales report
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise} Report data
   */
  daily: async (date) => {
    try {
      const response = await api.get(`/reports/daily?date=${date}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get monthly sales report
   * @param {number} year - Year
   * @param {number} month - Month (1-12)
   * @returns {Promise} Report data
   */
  monthly: async (year, month) => {
    try {
      const response = await api.get(`/reports/monthly?year=${year}&month=${month}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get yearly sales report
   * @param {number} year - Year
   * @returns {Promise} Report data
   */
  yearly: async (year) => {
    try {
      const response = await api.get(`/reports/yearly?year=${year}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get sales report with custom period
   * @param {string} period - Period (today, week, month, year)
   * @param {string} startDate - Start date (optional)
   * @param {string} endDate - End date (optional)
   * @returns {Promise} Report data
   */
  sales: async (period, startDate, endDate) => {
    try {
      let url = `/reports/sales?period=${period}`;
      if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get inventory report
   * @returns {Promise} Inventory report data
   */
  inventory: async () => {
    try {
      const response = await api.get('/reports/inventory');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get stock movement report
   * @param {string} period - Period (today, week, month, year)
   * @param {number} productId - Product ID (optional)
   * @returns {Promise} Stock movement report data
   */
  stockMovements: async (period, productId) => {
    try {
      let url = `/reports/stock-movements?period=${period}`;
      if (productId) {
        url += `&productId=${productId}`;
      }
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export const getReports = reportService;
export default reportService;

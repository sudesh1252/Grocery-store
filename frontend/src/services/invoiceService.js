// Invoice Service
// Handles all invoice-related API calls

import api from './api';

const invoiceService = {
  /**
   * Get all invoices
   * @param {string} searchQuery - Optional search query
   * @returns {Promise} List of invoices
   */
  getAllInvoices: async (searchQuery = '') => {
    try {
      const url = searchQuery ? `/invoices?search=${searchQuery}` : '/invoices';
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single invoice by ID
   * @param {string} id - Invoice ID
   * @returns {Promise} Invoice data
   */
  getInvoiceById: async (id) => {
    try {
      const response = await api.get(`/invoices/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new invoice
   * @param {object} invoiceData - Invoice data
   * @returns {Promise} Created invoice
   */
  createInvoice: async (invoiceData) => {
    try {
      const response = await api.post('/invoices', invoiceData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete invoice
   * @param {string} id - Invoice ID
   * @returns {Promise} Success message
   */
  deleteInvoice: async (id) => {
    try {
      const response = await api.delete(`/invoices/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get dashboard statistics
   * @returns {Promise} Dashboard stats
   */
  getDashboardStats: async () => {
    try {
      const response = await api.get('/invoices/stats');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default invoiceService;

// Invoice Number Generator
// Generates unique invoice numbers

const { Invoice } = require('../models');
const { Op } = require('sequelize');

/**
 * Generate unique invoice number
 * Format: INV-YYYYMMDD-XXXX
 * @returns {Promise<string>} Invoice number
 */
const generateInvoiceNumber = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const datePrefix = `INV-${year}${month}${day}`;
  
  // Get today's start and end
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  // Count today's invoices
  const count = await Invoice.count({
    where: {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
  
  // Generate sequence number
  const sequence = String(count + 1).padStart(4, '0');
  
  return `${datePrefix}-${sequence}`;
};

module.exports = generateInvoiceNumber;

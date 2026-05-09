// Invoice Routes - API Endpoints
// This file defines all the API routes for invoice operations

const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Helper function to generate unique invoice number
const generateInvoiceNumber = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Count today's invoices to generate sequential number
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  const count = await Invoice.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  });
  
  const sequence = String(count + 1).padStart(4, '0');
  return `INV-${year}${month}${day}-${sequence}`;
};

// @route   GET /api/invoices
// @desc    Get all invoices (with optional search)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    // If search parameter exists, search by customer name or invoice number
    if (search) {
      query = {
        $or: [
          { customerName: { $regex: search, $options: 'i' } },
          { invoiceNumber: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Get invoices sorted by newest first
    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .limit(100); // Limit to last 100 invoices
    
    res.json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message
    });
  }
});

// @route   GET /api/invoices/stats/dashboard
// @desc    Get dashboard statistics
// @access  Public
router.get('/stats/dashboard', async (req, res) => {
  try {
    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    // Total number of invoices
    const totalInvoices = await Invoice.countDocuments();
    
    // Total sales (all time)
    const totalSalesResult = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);
    const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;
    
    // Today's revenue
    const todayRevenueResult = await Invoice.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);
    const todayRevenue = todayRevenueResult.length > 0 ? todayRevenueResult[0].total : 0;
    
    // Today's invoice count
    const todayInvoices = await Invoice.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });
    
    res.json({
      success: true,
      data: {
        totalSales: totalSales.toFixed(2),
        totalInvoices,
        todayRevenue: todayRevenue.toFixed(2),
        todayInvoices
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
});

// @route   GET /api/invoices/:id
// @desc    Get single invoice by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice',
      error: error.message
    });
  }
});

// @route   POST /api/invoices
// @desc    Create new invoice
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, items, subtotal, tax, total } = req.body;
    
    // Validate required fields
    if (!customerName || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name and at least one item'
      });
    }
    
    // Generate unique invoice number
    const invoiceNumber = await generateInvoiceNumber();
    
    // Create new invoice
    const invoice = await Invoice.create({
      invoiceNumber,
      customerName,
      customerPhone: customerPhone || '',
      items,
      subtotal,
      tax,
      total
    });
    
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message
    });
  }
});

// @route   DELETE /api/invoices/:id
// @desc    Delete invoice
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }
    
    await invoice.deleteOne();
    
    res.json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting invoice',
      error: error.message
    });
  }
});

module.exports = router;

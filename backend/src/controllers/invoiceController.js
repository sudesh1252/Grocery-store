// Invoice Controller
// Handles all invoice operations

const asyncHandler = require('express-async-handler');
const { Invoice, InvoiceItem, User } = require('../models');
const { Op } = require('sequelize');
const generateInvoiceNumber = require('../utils/generateInvoiceNumber');

/**
 * @desc    Get all invoices for logged-in user
 * @route   GET /api/invoices
 * @access  Private
 */
const getInvoices = asyncHandler(async (req, res) => {
  const { search } = req.query;
  
  let whereClause = { userId: req.user.id };
  
  // Add search functionality
  if (search) {
    whereClause = {
      ...whereClause,
      [Op.or]: [
        { invoiceNumber: { [Op.like]: `%${search}%` } },
        { customerName: { [Op.like]: `%${search}%` } },
        { customerPhone: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  
  const invoices = await Invoice.findAll({
    where: whereClause,
    include: [
      {
        model: InvoiceItem,
        as: 'items',
        attributes: ['id', 'name', 'quantity', 'price', 'total'],
      },
    ],
    order: [['createdAt', 'DESC']],
    limit: 100, // Limit for performance
  });
  
  res.json({
    success: true,
    count: invoices.length,
    data: invoices,
  });
});

/**
 * @desc    Get single invoice by ID
 * @route   GET /api/invoices/:id
 * @access  Private
 */
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id, // Ensure user owns this invoice
    },
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
  });
  
  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }
  
  res.json({
    success: true,
    data: invoice,
  });
});

/**
 * @desc    Create new invoice
 * @route   POST /api/invoices
 * @access  Private
 */
const createInvoice = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerPhone,
    items,
    subtotal,
    tax,
    total,
  } = req.body;
  
  // Import Product and StockMovement models
  const { Product, StockMovement } = require('../models');
  
  // Validate stock availability for all items
  const stockErrors = [];
  const productsToUpdate = [];
  
  for (const item of items) {
    // Try to find product by name
    const product = await Product.findOne({
      where: {
        name: item.name,
        userId: req.user.id,
      },
    });
    
    if (product) {
      // Check if enough stock is available
      if (product.stock < item.quantity) {
        stockErrors.push({
          name: item.name,
          available: product.stock,
          requested: item.quantity,
        });
      } else {
        // Track products to update
        productsToUpdate.push({
          product,
          quantity: item.quantity,
        });
      }
    }
    // If product not found in inventory, allow manual entry (won't affect stock)
  }
  
  // If there are stock errors, return error
  if (stockErrors.length > 0) {
    res.status(400);
    const errorMsg = stockErrors
      .map(e => `${e.name}: requested ${e.requested}, only ${e.available} available`)
      .join('; ');
    throw new Error(`Insufficient stock - ${errorMsg}`);
  }
  
  // Generate unique invoice number
  const invoiceNumber = await generateInvoiceNumber();
  
  // Create invoice
  const invoice = await Invoice.create({
    invoiceNumber,
    customerName,
    customerPhone: customerPhone || null,
    subtotal,
    tax,
    total,
    userId: req.user.id,
  });
  
  // Create invoice items
  const invoiceItems = items.map((item) => ({
    ...item,
    invoiceId: invoice.id,
  }));
  
  await InvoiceItem.bulkCreate(invoiceItems);
  
  // Update product stock and create stock movements
  for (const { product, quantity } of productsToUpdate) {
    const previousStock = product.stock;
    const newStock = previousStock - quantity;
    
    // Update product stock
    await product.update({ stock: newStock });
    
    // Create stock movement record
    await StockMovement.create({
      productId: product.id,
      type: 'out',
      quantity: quantity,
      previousStock,
      newStock,
      reason: `Sold via invoice ${invoiceNumber}`,
      referenceType: 'invoice',
      referenceId: invoice.id,
      userId: req.user.id,
    });
  }
  
  // Fetch complete invoice with items
  const completeInvoice = await Invoice.findByPk(invoice.id, {
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
  });
  
  res.status(201).json({
    success: true,
    message: 'Invoice created successfully',
    data: completeInvoice,
  });
});

/**
 * @desc    Delete invoice
 * @route   DELETE /api/invoices/:id
 * @access  Private
 */
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id, // Ensure user owns this invoice
    },
  });
  
  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }
  
  // Delete invoice (items will be deleted automatically due to CASCADE)
  await invoice.destroy();
  
  res.json({
    success: true,
    message: 'Invoice deleted successfully',
  });
});

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/invoices/stats
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Get today's date range
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
  // Total invoices count
  const totalInvoices = await Invoice.count({
    where: { userId },
  });
  
  // Total sales (sum of all invoice totals)
  const totalSalesResult = await Invoice.sum('total', {
    where: { userId },
  });
  const totalSales = totalSalesResult || 0;
  
  // Today's revenue
  const todayRevenueResult = await Invoice.sum('total', {
    where: {
      userId,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
  const todayRevenue = todayRevenueResult || 0;
  
  // Today's invoice count
  const todayInvoices = await Invoice.count({
    where: {
      userId,
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
  });
  
  res.json({
    success: true,
    data: {
      totalSales: parseFloat(totalSales).toFixed(2),
      totalInvoices,
      todayRevenue: parseFloat(todayRevenue).toFixed(2),
      todayInvoices,
    },
  });
});

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  getDashboardStats,
};

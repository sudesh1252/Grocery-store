// Report Controller
// Handles all reporting operations (daily, monthly, yearly)

const asyncHandler = require('express-async-handler');
const { Invoice, InvoiceItem, Product, StockMovement } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/db');

// @desc    Get sales report (day/month/year)
// @route   GET /api/reports/sales
// @access  Private
const getSalesReport = asyncHandler(async (req, res) => {
  const { period, startDate, endDate } = req.query;
  
  let dateFilter = {};
  const now = new Date();
  
  if (period === 'today') {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    dateFilter = {
      createdAt: {
        [Op.gte]: today,
      },
    };
  } else if (period === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    dateFilter = {
      createdAt: {
        [Op.gte]: weekAgo,
      },
    };
  } else if (period === 'month') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    dateFilter = {
      createdAt: {
        [Op.gte]: monthStart,
      },
    };
  } else if (period === 'year') {
    const yearStart = new Date(now.getFullYear(), 0, 1);
    dateFilter = {
      createdAt: {
        [Op.gte]: yearStart,
      },
    };
  } else if (startDate && endDate) {
    dateFilter = {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    };
  }
  
  // Get invoices
  const invoices = await Invoice.findAll({
    where: {
      userId: req.user.id,
      ...dateFilter,
    },
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  
  // Calculate totals
  const totalSales = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalInvoices = invoices.length;
  const totalItems = invoices.reduce((sum, inv) => sum + inv.items.length, 0);
  const averageSale = totalInvoices > 0 ? totalSales / totalInvoices : 0;
  
  // Group by date
  const salesByDate = {};
  invoices.forEach(invoice => {
    const date = invoice.createdAt.toISOString().split('T')[0];
    if (!salesByDate[date]) {
      salesByDate[date] = {
        date,
        sales: 0,
        invoices: 0,
      };
    }
    salesByDate[date].sales += parseFloat(invoice.total);
    salesByDate[date].invoices += 1;
  });
  
  res.json({
    success: true,
    data: {
      summary: {
        totalSales: parseFloat(totalSales.toFixed(2)),
        totalInvoices,
        totalItems,
        averageSale: parseFloat(averageSale.toFixed(2)),
      },
      salesByDate: Object.values(salesByDate),
      invoices,
    },
  });
});

// @desc    Get inventory report
// @route   GET /api/reports/inventory
// @access  Private
const getInventoryReport = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    where: { userId: req.user.id },
    order: [['category', 'ASC'], ['name', 'ASC']],
  });
  
  // Calculate totals
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.stock * parseFloat(p.sellingPrice)), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  
  // Group by category
  const byCategory = {};
  products.forEach(product => {
    if (!byCategory[product.category]) {
      byCategory[product.category] = {
        category: product.category,
        products: 0,
        stock: 0,
        value: 0,
      };
    }
    byCategory[product.category].products += 1;
    byCategory[product.category].stock += product.stock;
    byCategory[product.category].value += product.stock * parseFloat(product.sellingPrice);
  });
  
  // Group by status
  const byStatus = {
    active: products.filter(p => p.status === 'active').length,
    inactive: products.filter(p => p.status === 'inactive').length,
    discontinued: products.filter(p => p.status === 'discontinued').length,
  };
  
  res.json({
    success: true,
    data: {
      summary: {
        totalProducts,
        totalStock,
        totalValue: parseFloat(totalValue.toFixed(2)),
        lowStockCount,
        outOfStockCount,
      },
      byCategory: Object.values(byCategory),
      byStatus,
      products,
    },
  });
});

// @desc    Get stock movement report
// @route   GET /api/reports/stock-movements
// @access  Private
const getStockMovementReport = asyncHandler(async (req, res) => {
  const { period, startDate, endDate, productId } = req.query;
  
  let dateFilter = {};
  const now = new Date();
  
  if (period === 'today') {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    dateFilter = {
      createdAt: {
        [Op.gte]: today,
      },
    };
  } else if (period === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    dateFilter = {
      createdAt: {
        [Op.gte]: weekAgo,
      },
    };
  } else if (period === 'month') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    dateFilter = {
      createdAt: {
        [Op.gte]: monthStart,
      },
    };
  } else if (period === 'year') {
    const yearStart = new Date(now.getFullYear(), 0, 1);
    dateFilter = {
      createdAt: {
        [Op.gte]: yearStart,
      },
    };
  } else if (startDate && endDate) {
    dateFilter = {
      createdAt: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    };
  }
  
  const where = {
    userId: req.user.id,
    ...dateFilter,
  };
  
  if (productId) {
    where.productId = productId;
  }
  
  const movements = await StockMovement.findAll({
    where,
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'sku', 'category'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  
  // Calculate totals
  const totalIn = movements
    .filter(m => m.type === 'in')
    .reduce((sum, m) => sum + m.quantity, 0);
  
  const totalOut = movements
    .filter(m => m.type === 'out')
    .reduce((sum, m) => sum + m.quantity, 0);
  
  // Group by type
  const byType = {
    in: movements.filter(m => m.type === 'in').length,
    out: movements.filter(m => m.type === 'out').length,
    adjustment: movements.filter(m => m.type === 'adjustment').length,
    return: movements.filter(m => m.type === 'return').length,
    damage: movements.filter(m => m.type === 'damage').length,
  };
  
  res.json({
    success: true,
    data: {
      summary: {
        totalMovements: movements.length,
        totalIn,
        totalOut,
        netChange: totalIn - totalOut,
      },
      byType,
      movements,
    },
  });
});

// @desc    Get daily sales report
// @route   GET /api/reports/daily
// @access  Private
const getDailyReport = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const targetDate = date ? new Date(date) : new Date();
  
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
  
  const invoices = await Invoice.findAll({
    where: {
      userId: req.user.id,
      createdAt: {
        [Op.gte]: startOfDay,
        [Op.lt]: endOfDay,
      },
    },
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  
  const totalSales = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalInvoices = invoices.length;
  
  // Group by hour
  const salesByHour = {};
  for (let i = 0; i < 24; i++) {
    salesByHour[i] = { hour: i, sales: 0, invoices: 0 };
  }
  
  invoices.forEach(invoice => {
    const hour = invoice.createdAt.getHours();
    salesByHour[hour].sales += parseFloat(invoice.total);
    salesByHour[hour].invoices += 1;
  });
  
  res.json({
    success: true,
    data: {
      date: startOfDay.toISOString().split('T')[0],
      summary: {
        totalSales: parseFloat(totalSales.toFixed(2)),
        totalInvoices,
      },
      salesByHour: Object.values(salesByHour),
      invoices,
    },
  });
});

// @desc    Get monthly sales report
// @route   GET /api/reports/monthly
// @access  Private
const getMonthlyReport = asyncHandler(async (req, res) => {
  const { year, month } = req.query;
  const targetYear = year ? parseInt(year) : new Date().getFullYear();
  const targetMonth = month ? parseInt(month) - 1 : new Date().getMonth();
  
  const startOfMonth = new Date(targetYear, targetMonth, 1);
  const endOfMonth = new Date(targetYear, targetMonth + 1, 1);
  
  const invoices = await Invoice.findAll({
    where: {
      userId: req.user.id,
      createdAt: {
        [Op.gte]: startOfMonth,
        [Op.lt]: endOfMonth,
      },
    },
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  
  const totalSales = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalInvoices = invoices.length;
  
  // Group by day
  const salesByDay = {};
  const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    salesByDay[i] = { day: i, sales: 0, invoices: 0 };
  }
  
  invoices.forEach(invoice => {
    const day = invoice.createdAt.getDate();
    salesByDay[day].sales += parseFloat(invoice.total);
    salesByDay[day].invoices += 1;
  });
  
  res.json({
    success: true,
    data: {
      year: targetYear,
      month: targetMonth + 1,
      summary: {
        totalSales: parseFloat(totalSales.toFixed(2)),
        totalInvoices,
      },
      salesByDay: Object.values(salesByDay),
      invoices,
    },
  });
});

// @desc    Get yearly sales report
// @route   GET /api/reports/yearly
// @access  Private
const getYearlyReport = asyncHandler(async (req, res) => {
  const { year } = req.query;
  const targetYear = year ? parseInt(year) : new Date().getFullYear();
  
  const startOfYear = new Date(targetYear, 0, 1);
  const endOfYear = new Date(targetYear + 1, 0, 1);
  
  const invoices = await Invoice.findAll({
    where: {
      userId: req.user.id,
      createdAt: {
        [Op.gte]: startOfYear,
        [Op.lt]: endOfYear,
      },
    },
    include: [
      {
        model: InvoiceItem,
        as: 'items',
      },
    ],
    order: [['createdAt', 'DESC']],
  });
  
  const totalSales = invoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
  const totalInvoices = invoices.length;
  
  // Group by month
  const salesByMonth = {};
  for (let i = 0; i < 12; i++) {
    salesByMonth[i] = { month: i + 1, sales: 0, invoices: 0 };
  }
  
  invoices.forEach(invoice => {
    const month = invoice.createdAt.getMonth();
    salesByMonth[month].sales += parseFloat(invoice.total);
    salesByMonth[month].invoices += 1;
  });
  
  res.json({
    success: true,
    data: {
      year: targetYear,
      summary: {
        totalSales: parseFloat(totalSales.toFixed(2)),
        totalInvoices,
      },
      salesByMonth: Object.values(salesByMonth),
      invoices,
    },
  });
});

module.exports = {
  getSalesReport,
  getInventoryReport,
  getStockMovementReport,
  getDailyReport,
  getMonthlyReport,
  getYearlyReport,
};

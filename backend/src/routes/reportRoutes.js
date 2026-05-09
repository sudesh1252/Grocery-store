// Report Routes
// API endpoints for reports (daily, monthly, yearly)

const express = require('express');
const router = express.Router();
const {
  getSalesReport,
  getInventoryReport,
  getStockMovementReport,
  getDailyReport,
  getMonthlyReport,
  getYearlyReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Report routes
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);
router.get('/stock-movements', getStockMovementReport);
router.get('/daily', getDailyReport);
router.get('/monthly', getMonthlyReport);
router.get('/yearly', getYearlyReport);

module.exports = router;

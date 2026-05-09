// Invoice Routes
// Defines API endpoints for invoice operations

const express = require('express');
const router = express.Router();
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  getDashboardStats,
} = require('../controllers/invoiceController');
const {
  invoiceValidation,
  validate,
} = require('../middleware/validator');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)

// Dashboard statistics (must be before /:id route)
router.get('/stats', protect, getDashboardStats);

// Invoice CRUD operations
router.route('/')
  .get(protect, getInvoices)
  .post(protect, invoiceValidation, validate, createInvoice);

router.route('/:id')
  .get(protect, getInvoiceById)
  .delete(protect, deleteInvoice);

module.exports = router;

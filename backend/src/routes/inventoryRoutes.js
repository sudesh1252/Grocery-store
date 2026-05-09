// Inventory Routes
// API endpoints for inventory/product management

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  getStockMovements,
  getLowStockProducts,
  getCategories,
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { validateProduct, validateStockAdjustment } = require('../middleware/validator');

// All routes are protected
router.use(protect);

// Product routes
router.route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

router.route('/categories')
  .get(getCategories);

router.route('/alerts/low-stock')
  .get(getLowStockProducts);

router.route('/:id')
  .get(getProduct)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

router.route('/:id/adjust-stock')
  .post(validateStockAdjustment, adjustStock);

router.route('/:id/movements')
  .get(getStockMovements);

module.exports = router;

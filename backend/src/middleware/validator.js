// Validation Middleware
// Input validation for requests

const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validation rules for user signup
const signupValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Validation rules for user login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Validation rules for invoice creation
const invoiceValidation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ max: 100 })
    .withMessage('Customer name too long'),
  body('customerPhone')
    .optional()
    .trim()
    .isLength({ max: 15 })
    .withMessage('Phone number too long'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.name')
    .trim()
    .notEmpty()
    .withMessage('Item name is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('subtotal')
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number'),
  body('tax')
    .isFloat({ min: 0 })
    .withMessage('Tax must be a positive number'),
  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
];

// Validation rules for product creation/update
const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 200 })
    .withMessage('Product name too long'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU is required')
    .isLength({ max: 50 })
    .withMessage('SKU too long'),
  body('unit')
    .trim()
    .notEmpty()
    .withMessage('Unit is required'),
  body('purchasePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Purchase price must be a positive number'),
  body('sellingPrice')
    .isFloat({ min: 0 })
    .withMessage('Selling price must be a positive number'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
  body('minStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum stock must be a positive integer'),
  validate,
];

// Validation rules for stock adjustment
const validateStockAdjustment = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('type')
    .isIn(['in', 'out'])
    .withMessage('Type must be either "in" or "out"'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Reason too long'),
  validate,
];

module.exports = {
  signupValidation,
  loginValidation,
  invoiceValidation,
  validateProduct,
  validateStockAdjustment,
  validate,
};

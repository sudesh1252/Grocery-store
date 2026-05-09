// Authentication Routes
// Defines API endpoints for authentication

const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
} = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
  validate,
} = require('../middleware/validator');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;

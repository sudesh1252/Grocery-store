// Authentication Routes
// Defines API endpoints for authentication

const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const {
  forgotPassword,
  resetPassword,
  verifyResetToken,
} = require('../controllers/passwordResetController');
const {
  signupValidation,
  loginValidation,
  validate,
} = require('../middleware/validator');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Password reset routes (public)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;

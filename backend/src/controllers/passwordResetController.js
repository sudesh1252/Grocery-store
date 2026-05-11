// Password Reset Controller
// Handles forgot password and reset password functionality

const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const { User } = require('../models');
const { sendPasswordResetEmail } = require('../utils/emailService');

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Please provide an email address');
  }

  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    // Don't reveal if user exists or not (security best practice)
    res.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    });
    return;
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token before saving to database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token and expiry (1 hour from now)
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

  try {
    // Send email (if email service is configured)
    if (process.env.EMAIL_ENABLED === 'true') {
      await sendPasswordResetEmail(user.email, user.name, resetUrl);
    } else {
      // For development: Log the reset URL
      console.log('\n📧 PASSWORD RESET EMAIL (Development Mode)');
      console.log('═══════════════════════════════════════════');
      console.log(`To: ${user.email}`);
      console.log(`Name: ${user.name}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('═══════════════════════════════════════════\n');
    }

    res.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
      // In development, include the token
      ...(process.env.NODE_ENV === 'development' && { resetToken, resetUrl }),
    });
  } catch (error) {
    // If email fails, clear the reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    console.error('Email send error:', error);
    res.status(500);
    throw new Error('Email could not be sent. Please try again later.');
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) {
    res.status(400);
    throw new Error('Please provide a new password');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // Hash the token from URL to compare with database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user with valid reset token
  const user = await User.findOne({
    where: {
      resetPasswordToken: resetTokenHash,
    },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired reset token');
  }

  // Check if token has expired
  if (user.resetPasswordExpire < Date.now()) {
    res.status(400);
    throw new Error('Reset token has expired. Please request a new one.');
  }

  // Update password (will be hashed by User model hook)
  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  res.json({
    success: true,
    message: 'Password reset successful! You can now login with your new password.',
  });
});

// @desc    Verify reset token
// @route   GET /api/auth/verify-reset-token/:token
// @access  Public
const verifyResetToken = asyncHandler(async (req, res) => {
  const { token } = req.params;

  // Hash the token
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    where: {
      resetPasswordToken: resetTokenHash,
    },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid reset token');
  }

  // Check if token has expired
  if (user.resetPasswordExpire < Date.now()) {
    res.status(400);
    throw new Error('Reset token has expired');
  }

  res.json({
    success: true,
    message: 'Token is valid',
    email: user.email,
  });
});

module.exports = {
  forgotPassword,
  resetPassword,
  verifyResetToken,
};

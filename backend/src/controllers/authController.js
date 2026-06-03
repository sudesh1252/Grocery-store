// Authentication Controller
// Handles user signup, login, and profile

const asyncHandler = require('express-async-handler');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = asyncHandler(async (req, res) => {
  console.log('📝 Signup request received:', { 
    body: req.body,
    headers: req.headers 
  });
  
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    console.log('❌ User already exists:', email);
    res.status(400);
    throw new Error('User already exists with this email');
  }

  // Create user
  console.log('✅ Creating new user:', { name, email });
  const user = await User.create({
    name,
    email,
    password, // Will be hashed by model hook
  });

  if (user) {
    console.log('✅ User created successfully:', user.id);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    console.log('❌ Failed to create user');
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (user && (await user.comparePassword(password))) {
    res.json({
      success: true,
      message: 'Login successful',
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
  });

  if (user) {
    res.json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  signup,
  login,
  getMe,
};

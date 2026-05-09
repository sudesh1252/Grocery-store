// Application Constants
// Centralized place for all constant values

// API Base URL from environment variable
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// App Information
export const APP_NAME = 'Shree Grocery Store';
export const APP_VERSION = '1.0.0';

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'shree_grocery_token',
  USER: 'shree_grocery_user',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Tax Configuration (in percentage)
export const TAX_RATE = 5; // 5% GST

// Date Format
export const DATE_FORMAT = {
  DISPLAY: 'DD MMM YYYY, hh:mm A',
  SHORT: 'DD/MM/YYYY',
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  SIGNUP_SUCCESS: 'Account created successfully!',
  INVOICE_CREATED: 'Invoice created successfully!',
  INVOICE_DELETED: 'Invoice deleted successfully.',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 50,
  MAX_PHONE_LENGTH: 15,
};

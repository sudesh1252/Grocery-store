// Helper Functions
// Reusable utility functions used across the application

/**
 * Format currency to Indian Rupee format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date to short format (DD/MM/YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-IN');
};

/**
 * Calculate percentage
 * @param {number} value - Base value
 * @param {number} percentage - Percentage to calculate
 * @returns {number} Calculated percentage value
 */
export const calculatePercentage = (value, percentage) => {
  return (value * percentage) / 100;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('shree_grocery_token');
  return !!token;
};

/**
 * Get stored token
 * @returns {string|null} Token or null
 */
export const getToken = () => {
  return localStorage.getItem('shree_grocery_token');
};

/**
 * Store token
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('shree_grocery_token', token);
};

/**
 * Remove token
 */
export const removeToken = () => {
  localStorage.removeItem('shree_grocery_token');
  localStorage.removeItem('shree_grocery_user');
};

/**
 * Get stored user
 * @returns {object|null} User object or null
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('shree_grocery_user');
  return user ? JSON.parse(user) : null;
};

/**
 * Store user
 * @param {object} user - User object
 */
export const setStoredUser = (user) => {
  localStorage.setItem('shree_grocery_user', JSON.stringify(user));
};

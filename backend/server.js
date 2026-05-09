// Main Server File
// This is the entry point for the backend application

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS - allows frontend to communicate with backend
app.use(cors());

// Body parser - allows reading JSON data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/invoices', require('./routes/invoices'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🛒 Welcome to Shree Grocery Store API',
    version: '1.0.0',
    endpoints: {
      invoices: '/api/invoices',
      dashboard: '/api/invoices/stats/dashboard'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

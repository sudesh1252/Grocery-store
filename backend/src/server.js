// Main Server File
// Entry point for the backend application

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true,
}));

app.use(express.json({ limit: '10mb' })); // Body parser with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Root route
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    message: '🛒 Welcome to Shree Grocery Store API',
    version: '2.0.0',
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/me',
      },
      invoices: {
        getAll: 'GET /api/invoices',
        getOne: 'GET /api/invoices/:id',
        create: 'POST /api/invoices',
        delete: 'DELETE /api/invoices/:id',
        stats: 'GET /api/invoices/stats',
      },
      inventory: {
        getAll: 'GET /api/inventory',
        getOne: 'GET /api/inventory/:id',
        create: 'POST /api/inventory',
        update: 'PUT /api/inventory/:id',
        delete: 'DELETE /api/inventory/:id',
        adjustStock: 'POST /api/inventory/:id/adjust-stock',
        movements: 'GET /api/inventory/:id/movements',
        lowStock: 'GET /api/inventory/alerts/low-stock',
        categories: 'GET /api/inventory/categories',
      },
      reports: {
        sales: 'GET /api/reports/sales',
        inventory: 'GET /api/reports/inventory',
        stockMovements: 'GET /api/reports/stock-movements',
        daily: 'GET /api/reports/daily',
        monthly: 'GET /api/reports/monthly',
        yearly: 'GET /api/reports/yearly',
      },
    },
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Test endpoint for debugging
app.post('/api/test-signup', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { User } = require('./models');
    const testUser = await User.create({
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'test123',
      role: 'user'
    });
    res.json({
      success: true,
      message: 'Test user created',
      user: {
        id: testUser.id,
        name: testUser.name,
        email: testUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

// Function to reset and create default users
const resetAndCreateUsers = async () => {
  try {
    const User = require('./models/User');
    
    console.log('🔄 Setting up users...');
    
    // Don't drop table - just delete all users and recreate
    await User.destroy({ where: {}, truncate: true, cascade: true });
    
    console.log('✅ Users table cleared');
    
    // Create admin user with plain password (will be hashed by model hook)
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@shreegrocery.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('✅ Admin user created');
    console.log('   Email: admin@shreegrocery.com');
    console.log('   Password: admin123');
    console.log('   ID:', admin.id);
    
    // Create your personal account
    const user = await User.create({
      name: 'Kirol Kar',
      email: 'kirolkarsudesh06@gmail.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('✅ Personal account created');
    console.log('   Email: kirolkarsudesh06@gmail.com');
    console.log('   Password: admin123');
    console.log('   ID:', user.id);
    console.log('\n');
    
    // Test password comparison
    const testLogin = await admin.comparePassword('admin123');
    console.log('🧪 Password comparison test:', testLogin ? '✅ PASS' : '❌ FAIL');
    console.log('\n');
    
  } catch (error) {
    console.error('⚠️  Error setting up users:', error.message);
    console.error(error);
  }
};

const server = app.listen(PORT, async () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SERVER STARTED SUCCESSFULLY');
  console.log('='.repeat(60));
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60) + '\n');
  
  // Sync database and reset users
  try {
    // Sync other tables normally
    await sequelize.sync({ alter: false });
    console.log('✅ Database connected\n');
    
    // Reset and create users (only runs once per deployment)
    await resetAndCreateUsers();
  } catch (error) {
    console.error('⚠️  Error during startup:', error.message);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

module.exports = app;

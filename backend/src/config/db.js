// MySQL Database Configuration using Sequelize ORM
// This file handles MySQL connection and Sequelize setup

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance with MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Username
  process.env.DB_PASSWORD,  // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    
    // Connection pool configuration for better performance
    pool: {
      max: 5,          // Maximum number of connections
      min: 0,          // Minimum number of connections
      acquire: 30000,  // Maximum time (ms) to get connection
      idle: 10000      // Maximum time (ms) connection can be idle
    },
    
    // Logging configuration
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    
    // Timezone configuration
    timezone: '+05:30', // IST (Indian Standard Time)
    
    // Define options
    define: {
      timestamps: true,        // Automatically add createdAt and updatedAt
      underscored: false,      // Use camelCase instead of snake_case
      freezeTableName: true    // Prevent Sequelize from pluralizing table names
    }
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Sync models with database (creates tables if they don't exist)
    // In production, use migrations instead of sync
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false }); // alter: true updates existing tables
      console.log('📋 Database tables synchronized');
    }
    
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MySQL service is running');
    console.error('   2. Verify database credentials in .env file');
    console.error('   3. Ensure database exists: CREATE DATABASE shree_grocery;');
    console.error('   4. Check MySQL port (default: 3306)\n');
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

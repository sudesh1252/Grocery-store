// Product/Inventory Model - Sequelize
// Manages grocery store inventory

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Product name is required' },
    },
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'General',
  },
  sku: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: false, // Changed to false - will use composite unique index instead
  },
  barcode: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: false, // Changed to false - will use composite unique index instead
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'pcs',
    comment: 'Unit of measurement: pcs, kg, ltr, box, etc.',
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Purchase price cannot be negative' },
    },
  },
  sellingPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Selling price cannot be negative' },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Stock cannot be negative' },
    },
  },
  minStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    comment: 'Minimum stock level for alerts',
  },
  maxStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Maximum stock level',
  },
  supplier: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  supplierContact: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'discontinued'),
    defaultValue: 'active',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'products',
  timestamps: true,
  indexes: [
    { fields: ['sku', 'userId'], unique: true, name: 'idx_products_sku_user' }, // Composite unique index
    { fields: ['barcode', 'userId'], unique: true, name: 'idx_products_barcode_user' }, // Composite unique for barcode
    { fields: ['category'], name: 'idx_products_category' },
    { fields: ['status'], name: 'idx_products_status' },
    { fields: ['userId'], name: 'idx_products_user_id' },
  ],
});

module.exports = Product;

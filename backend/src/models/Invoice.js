// Invoice Model - Sequelize
// Stores invoice/bill information

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Customer name is required' },
    },
  },
  customerPhone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Subtotal cannot be negative' },
    },
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Tax cannot be negative' },
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'Total cannot be negative' },
    },
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
  tableName: 'invoices',
  timestamps: true,
  indexes: [
    { fields: ['userId'], name: 'idx_invoices_user_id' },
    { fields: ['createdAt'], name: 'idx_invoices_created_at' },
  ],
});

module.exports = Invoice;

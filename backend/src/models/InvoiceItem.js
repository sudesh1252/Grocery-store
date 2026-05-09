// InvoiceItem Model - Sequelize
// Stores individual items in each invoice

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Item name is required' },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'Quantity must be at least 1' },
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Price cannot be negative' },
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Total cannot be negative' },
    },
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'invoices',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'invoice_items',
  timestamps: true,
  indexes: [
    { fields: ['invoiceId'], name: 'idx_invoice_items_invoice_id' },
  ],
});

module.exports = InvoiceItem;

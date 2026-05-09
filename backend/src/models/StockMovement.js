// Stock Movement Model - Sequelize
// Tracks all inventory movements (in/out)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const StockMovement = sequelize.define('StockMovement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('in', 'out', 'adjustment', 'return', 'damage'),
    allowNull: false,
    comment: 'in=purchase, out=sale, adjustment=manual, return=customer return, damage=damaged goods',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  previousStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  newStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  referenceType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'invoice, purchase_order, adjustment, etc.',
  },
  referenceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'ID of related invoice or purchase order',
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
  tableName: 'stock_movements',
  timestamps: true,
  indexes: [
    { fields: ['productId'], name: 'idx_stock_movements_product_id' },
    { fields: ['type'], name: 'idx_stock_movements_type' },
    { fields: ['createdAt'], name: 'idx_stock_movements_created_at' },
    { fields: ['userId'], name: 'idx_stock_movements_user_id' },
  ],
});

module.exports = StockMovement;

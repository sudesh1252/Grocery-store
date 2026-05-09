// Models Index - Define relationships
// Central place for all models and their associations

const User = require('./User');
const Invoice = require('./Invoice');
const InvoiceItem = require('./InvoiceItem');
const Product = require('./Product');
const StockMovement = require('./StockMovement');

// Define relationships

// User has many Invoices
User.hasMany(Invoice, {
  foreignKey: 'userId',
  as: 'invoices',
  onDelete: 'CASCADE',
});

// Invoice belongs to User
Invoice.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Invoice has many InvoiceItems
Invoice.hasMany(InvoiceItem, {
  foreignKey: 'invoiceId',
  as: 'items',
  onDelete: 'CASCADE',
});

// InvoiceItem belongs to Invoice
InvoiceItem.belongsTo(Invoice, {
  foreignKey: 'invoiceId',
  as: 'invoice',
});

// User has many Products
User.hasMany(Product, {
  foreignKey: 'userId',
  as: 'products',
  onDelete: 'CASCADE',
});

// Product belongs to User
Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Product has many StockMovements
Product.hasMany(StockMovement, {
  foreignKey: 'productId',
  as: 'stockMovements',
  onDelete: 'CASCADE',
});

// StockMovement belongs to Product
StockMovement.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

// User has many StockMovements
User.hasMany(StockMovement, {
  foreignKey: 'userId',
  as: 'stockMovements',
  onDelete: 'CASCADE',
});

// StockMovement belongs to User
StockMovement.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = {
  User,
  Invoice,
  InvoiceItem,
  Product,
  StockMovement,
};

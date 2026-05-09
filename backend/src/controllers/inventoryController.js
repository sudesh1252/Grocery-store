// Inventory Controller
// Handles all inventory/product management operations

const asyncHandler = require('express-async-handler');
const { Product, StockMovement } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products
// @route   GET /api/inventory
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const { category, status, search, lowStock } = req.query;
  
  const where = { userId: req.user.id };
  
  // Filter by category
  if (category) {
    where.category = category;
  }
  
  // Filter by status
  if (status) {
    where.status = status;
  }
  
  // Search by name or SKU
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { sku: { [Op.like]: `%${search}%` } },
    ];
  }
  
  // Filter low stock items
  if (lowStock === 'true') {
    where[Op.and] = [
      { stock: { [Op.lte]: sequelize.col('minStock') } }
    ];
  }
  
  const products = await Product.findAll({
    where,
    order: [['createdAt', 'DESC']],
  });
  
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/inventory/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    include: [
      {
        model: StockMovement,
        as: 'stockMovements',
        limit: 10,
        order: [['createdAt', 'DESC']],
      },
    ],
  });
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  res.json({
    success: true,
    data: product,
  });
});

// @desc    Create new product
// @route   POST /api/inventory
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    sku,
    barcode,
    description,
    unit,
    purchasePrice,
    sellingPrice,
    stock,
    minStock,
    maxStock,
    supplier,
    supplierContact,
    expiryDate,
  } = req.body;
  
  // Check if SKU already exists
  const existingProduct = await Product.findOne({ where: { sku } });
  if (existingProduct) {
    res.status(400);
    throw new Error('Product with this SKU already exists');
  }
  
  // Create product
  const product = await Product.create({
    name,
    category,
    sku,
    barcode,
    description,
    unit,
    purchasePrice,
    sellingPrice,
    stock: stock || 0,
    minStock: minStock || 10,
    maxStock,
    supplier,
    supplierContact,
    expiryDate,
    userId: req.user.id,
  });
  
  // Create initial stock movement if stock > 0
  if (stock > 0) {
    await StockMovement.create({
      productId: product.id,
      type: 'in',
      quantity: stock,
      previousStock: 0,
      newStock: stock,
      reason: 'Initial stock',
      userId: req.user.id,
    });
  }
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/inventory/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  const {
    name,
    category,
    sku,
    barcode,
    description,
    unit,
    purchasePrice,
    sellingPrice,
    minStock,
    maxStock,
    supplier,
    supplierContact,
    expiryDate,
    status,
  } = req.body;
  
  // Check if new SKU already exists (if SKU is being changed)
  if (sku && sku !== product.sku) {
    const existingProduct = await Product.findOne({ where: { sku } });
    if (existingProduct) {
      res.status(400);
      throw new Error('Product with this SKU already exists');
    }
  }
  
  // Update product
  await product.update({
    name: name || product.name,
    category: category || product.category,
    sku: sku || product.sku,
    barcode: barcode !== undefined ? barcode : product.barcode,
    description: description !== undefined ? description : product.description,
    unit: unit || product.unit,
    purchasePrice: purchasePrice !== undefined ? purchasePrice : product.purchasePrice,
    sellingPrice: sellingPrice !== undefined ? sellingPrice : product.sellingPrice,
    minStock: minStock !== undefined ? minStock : product.minStock,
    maxStock: maxStock !== undefined ? maxStock : product.maxStock,
    supplier: supplier !== undefined ? supplier : product.supplier,
    supplierContact: supplierContact !== undefined ? supplierContact : product.supplierContact,
    expiryDate: expiryDate !== undefined ? expiryDate : product.expiryDate,
    status: status || product.status,
  });
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  await product.destroy();
  
  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// @desc    Adjust stock
// @route   POST /api/inventory/:id/adjust-stock
// @access  Private
const adjustStock = asyncHandler(async (req, res) => {
  const { quantity, type, reason } = req.body;
  
  const product = await Product.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  const previousStock = product.stock;
  let newStock;
  
  if (type === 'in') {
    newStock = previousStock + parseInt(quantity);
  } else if (type === 'out') {
    newStock = previousStock - parseInt(quantity);
    if (newStock < 0) {
      res.status(400);
      throw new Error('Insufficient stock');
    }
  } else {
    res.status(400);
    throw new Error('Invalid adjustment type');
  }
  
  // Update product stock
  await product.update({ stock: newStock });
  
  // Create stock movement record
  await StockMovement.create({
    productId: product.id,
    type: type === 'in' ? 'in' : 'out',
    quantity: parseInt(quantity),
    previousStock,
    newStock,
    reason: reason || 'Manual adjustment',
    referenceType: 'adjustment',
    userId: req.user.id,
  });
  
  res.json({
    success: true,
    message: 'Stock adjusted successfully',
    data: {
      previousStock,
      newStock,
      quantity,
    },
  });
});

// @desc    Get stock movements
// @route   GET /api/inventory/:id/movements
// @access  Private
const getStockMovements = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  const movements = await StockMovement.findAll({
    where: { productId: product.id },
    order: [['createdAt', 'DESC']],
    limit: 50,
  });
  
  res.json({
    success: true,
    count: movements.length,
    data: movements,
  });
});

// @desc    Get low stock products
// @route   GET /api/inventory/alerts/low-stock
// @access  Private
const getLowStockProducts = asyncHandler(async (req, res) => {
  const { sequelize } = require('../config/db');
  
  const products = await Product.findAll({
    where: {
      userId: req.user.id,
      status: 'active',
      stock: {
        [Op.lte]: sequelize.col('minStock'),
      },
    },
    order: [['stock', 'ASC']],
  });
  
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get product categories
// @route   GET /api/inventory/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const { sequelize } = require('../config/db');
  
  const categories = await Product.findAll({
    attributes: [
      'category',
      [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
    ],
    where: { userId: req.user.id },
    group: ['category'],
    raw: true,
  });
  
  res.json({
    success: true,
    data: categories,
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  getStockMovements,
  getLowStockProducts,
  getCategories,
};

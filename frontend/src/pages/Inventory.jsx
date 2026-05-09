// Inventory Page
// Manage products - Add, Edit, Delete goods

import React, { useState, useEffect } from 'react';
import { FaBox, FaPlus, FaEdit, FaTrash, FaSearch, FaBarcode, FaFilter, FaFileExport, FaExclamationTriangle, FaChartBar, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import api from '../services/api';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'General',
    sellingPrice: '',
    purchasePrice: '0',
    stock: '0',
    minStock: '10',
    description: '',
    unit: 'pcs'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/inventory');
      const productsData = response.data.data || [];
      setProducts(productsData);
      
      // Calculate stats
      const total = productsData.length;
      const lowStock = productsData.filter(p => p.stock <= p.minStock && p.stock > 0).length;
      const outOfStock = productsData.filter(p => p.stock === 0).length;
      const totalValue = productsData.reduce((sum, p) => sum + (p.stock * p.sellingPrice), 0);
      
      setStats({ total, lowStock, outOfStock, totalValue });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data with defaults for required fields
      const productData = {
        ...formData,
        category: formData.category || 'General',
        purchasePrice: formData.purchasePrice || '0',
        stock: formData.stock || '0',
        minStock: formData.minStock || '10'
      };

      if (editingProduct) {
        // Update existing product
        await api.put(`/inventory/${editingProduct.id}`, productData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await api.post('/inventory', productData);
        toast.success('Product added successfully!');
      }
      
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku || '',
      barcode: product.barcode || '',
      category: product.category || '',
      sellingPrice: product.sellingPrice || '',
      purchasePrice: product.purchasePrice || '',
      stock: product.stock,
      minStock: product.minStock || '10',
      description: product.description || '',
      unit: product.unit || 'pcs'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/inventory/${id}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      barcode: '',
      category: 'General',
      sellingPrice: '',
      purchasePrice: '0',
      stock: '0',
      minStock: '10',
      description: '',
      unit: 'pcs'
    });
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    // Stock filter
    let matchesStock = true;
    if (filterStock === 'low') {
      matchesStock = product.stock <= product.minStock && product.stock > 0;
    } else if (filterStock === 'out') {
      matchesStock = product.stock === 0;
    } else if (filterStock === 'good') {
      matchesStock = product.stock > product.minStock;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = parseFloat(a.sellingPrice) - parseFloat(b.sellingPrice);
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
      case 'category':
        comparison = (a.category || '').localeCompare(b.category || '');
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'SKU', 'Category', 'Unit', 'Purchase Price', 'Selling Price', 'Stock', 'Min Stock', 'Value'];
    const rows = filteredProducts.map(p => [
      p.name,
      p.sku,
      p.category,
      p.unit,
      p.purchasePrice,
      p.sellingPrice,
      p.stock,
      p.minStock,
      (p.stock * p.sellingPrice).toFixed(2)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Inventory exported successfully!');
  };

  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          Inventory Management
        </h1>
        <p className="text-gray-600">Manage your products and stock efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <FaBox className="text-3xl text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <FaExclamationTriangle className="text-3xl text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <FaExclamationTriangle className="text-3xl text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-green-600">₹{stats.totalValue.toLocaleString('en-IN')}</p>
            </div>
            <FaChartBar className="text-3xl text-green-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                showFilters
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaFilter />
              Filters
            </button>
            
            <button
              onClick={exportToCSV}
              className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center gap-2 font-semibold"
            >
              <FaFileExport />
              Export
            </button>
            
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <FaPlus />
              Add Product
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status</label>
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stock</option>
                <option value="good">Good Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="stock">Stock</option>
                  <option value="category">Category</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <tr>
                  <th className="text-left py-4 px-6 font-bold">Product Name</th>
                  <th className="text-left py-4 px-6 font-bold">SKU</th>
                  <th className="text-left py-4 px-6 font-bold">Category</th>
                  <th className="text-right py-4 px-6 font-bold">Cost</th>
                  <th className="text-right py-4 px-6 font-bold">Price</th>
                  <th className="text-center py-4 px-6 font-bold">Stock</th>
                  <th className="text-right py-4 px-6 font-bold">Value</th>
                  <th className="text-center py-4 px-6 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-16">
                      <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-xl text-gray-400 font-semibold">No products found</p>
                      <p className="text-gray-500 mt-2">
                        {searchTerm || filterCategory !== 'all' || filterStock !== 'all'
                          ? 'Try adjusting your filters'
                          : 'Add your first product to get started'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.unit}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 font-mono text-sm">{product.sku || '-'}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {product.category || 'General'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-gray-600">
                        ₹{parseFloat(product.purchasePrice || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-gray-900">
                        ₹{parseFloat(product.sellingPrice || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            product.stock === 0
                              ? 'bg-red-100 text-red-700'
                              : product.stock <= (product.minStock || 0)
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-green-600">
                        ₹{(product.stock * product.sellingPrice).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaBox />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter product name"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Product SKU"
                  />
                </div>

                {/* Barcode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Product barcode"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Meat">Meat</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Household">Household</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="pcs">Pieces</option>
                    <option value="kg">Kilogram</option>
                    <option value="g">Gram</option>
                    <option value="l">Liter</option>
                    <option value="ml">Milliliter</option>
                    <option value="box">Box</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>

                {/* Purchase Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purchase Price (₹)
                  </label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>

                {/* Selling Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>

                {/* Min Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Stock Alert
                  </label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="10"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Product description (optional)"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

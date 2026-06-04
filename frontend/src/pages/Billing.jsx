// Billing Page
// Complete invoice creation system for real-world grocery store use

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaTrash, 
  FaEdit, 
  FaSave, 
  FaPrint,
  FaShoppingCart 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import invoiceService from '../services/invoiceService';
import api from '../services/api';
import { formatCurrency, calculatePercentage } from '../utils/helpers';
import { TAX_RATE } from '../utils/constants';

const Billing = () => {
  const navigate = useNavigate();

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
  });

  // Items list
  const [items, setItems] = useState([]);

  // Current item being added
  const [currentItem, setCurrentItem] = useState({
    name: '',
    quantity: 1,
    price: 0,
    productId: null,
    availableStock: null,
  });

  // Edit mode
  const [editingIndex, setEditingIndex] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Products from inventory
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch products from inventory
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await api.get('/inventory');
      const productsData = response.data || response || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Don't show error toast, just log it
    } finally {
      setLoadingProducts(false);
    }
  };

  // Handle customer info change
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle current item change
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value) || '',
    }));
  };

  // Handle product selection from dropdown
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    if (!productId) {
      setCurrentItem({ name: '', quantity: 1, price: 0, productId: null, availableStock: null });
      return;
    }

    const selectedProduct = products.find(p => p.id === parseInt(productId));
    if (selectedProduct) {
      // Check stock status
      const isOutOfStock = selectedProduct.stock === 0;
      const isLowStock = selectedProduct.stock > 0 && selectedProduct.stock <= selectedProduct.minStock;
      
      // Show warning for low or out of stock
      if (isOutOfStock) {
        toast.error(`${selectedProduct.name} is OUT OF STOCK!`);
      } else if (isLowStock) {
        toast.warning(`${selectedProduct.name} is LOW ON STOCK (Only ${selectedProduct.stock} remaining)`);
      }
      
      setCurrentItem({
        name: selectedProduct.name,
        quantity: 1,
        price: parseFloat(selectedProduct.sellingPrice) || 0,
        productId: selectedProduct.id,
        availableStock: selectedProduct.stock,
      });
    }
  };

  // Handle input focus - select all text
  const handleInputFocus = (e) => {
    e.target.select();
  };

  // Add item to list
  const addItem = () => {
    // Validate item
    if (!currentItem.name.trim()) {
      toast.error('Please enter item name');
      return;
    }
    if (currentItem.quantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }
    if (currentItem.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }
    
    // Check stock availability if product is from inventory
    if (currentItem.availableStock !== null && currentItem.availableStock !== undefined) {
      if (currentItem.quantity > currentItem.availableStock) {
        toast.error(`Cannot add ${currentItem.quantity} ${currentItem.name}. Only ${currentItem.availableStock} available in stock!`);
        return;
      }
      
      // Check if this would make stock go to zero
      if (currentItem.quantity === currentItem.availableStock) {
        toast.warning(`This will use all available stock of ${currentItem.name}!`);
      }
    }

    const itemTotal = currentItem.quantity * currentItem.price;

    if (editingIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editingIndex] = {
        ...currentItem,
        total: itemTotal,
      };
      setItems(updatedItems);
      setEditingIndex(null);
      toast.success('Item updated');
    } else {
      // Add new item
      setItems([
        ...items,
        {
          ...currentItem,
          total: itemTotal,
        },
      ]);
      toast.success('Item added');
    }

    // Reset current item
    setCurrentItem({
      name: '',
      quantity: 1,
      price: 0,
      productId: null,
      availableStock: null,
    });
  };

  // Edit item
  const editItem = (index) => {
    setCurrentItem(items[index]);
    setEditingIndex(index);
  };

  // Delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    toast.success('Item removed');
  };

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = calculatePercentage(subtotal, TAX_RATE);
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (items.length === 0) {
      newErrors.items = 'Please add at least one item';
      toast.error('Please add at least one item');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate invoice
  const generateInvoice = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const invoiceData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
        subtotal,
        tax,
        total,
      };

      await invoiceService.createInvoice(invoiceData);
      toast.success('Invoice created successfully!');
      
      // Reset form
      setCustomerInfo({ name: '', phone: '' });
      setItems([]);
      setCurrentItem({ name: '', quantity: 1, price: 0 });
      
      // Navigate to history
      setTimeout(() => {
        navigate('/history');
      }, 1500);
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error(error || 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  // Print invoice (basic implementation)
  const printInvoice = () => {
    if (items.length === 0) {
      toast.error('Please add items before printing');
      return;
    }
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create Invoice
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Generate a new bill for your customer
          </p>
        </div>
        <FaShoppingCart className="text-4xl text-primary-500" />
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="label">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerChange}
              className={`input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter customer name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="label">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleCustomerChange}
              className="input"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Add Items */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingIndex !== null ? 'Edit Item' : 'Add Items'}
        </h2>
        
        {/* Product Dropdown */}
        <div className="mb-4">
          <label htmlFor="productSelect" className="label">
            Select Product from Inventory
          </label>
          <select
            id="productSelect"
            onChange={handleProductSelect}
            className="input"
            disabled={loadingProducts}
          >
            <option value="">-- Select a product or type manually below --</option>
            {products.map((product) => {
              const isOutOfStock = product.stock === 0;
              const isLowStock = product.stock > 0 && product.stock <= product.minStock;
              const stockStatus = isOutOfStock ? '⛔ OUT OF STOCK' : isLowStock ? '⚠️ LOW STOCK' : '✓';
              
              return (
                <option 
                  key={product.id} 
                  value={product.id}
                  disabled={isOutOfStock}
                  style={{
                    color: isOutOfStock ? '#dc2626' : isLowStock ? '#ea580c' : '#059669',
                    fontWeight: isOutOfStock || isLowStock ? 'bold' : 'normal'
                  }}
                >
                  {stockStatus} {product.name} - ₹{parseFloat(product.sellingPrice).toFixed(2)} (Stock: {product.stock})
                </option>
              );
            })}
          </select>
          {loadingProducts && (
            <p className="text-sm text-gray-500 mt-1">Loading products...</p>
          )}
          {currentItem.availableStock !== null && currentItem.availableStock !== undefined && (
            <p className={`text-sm mt-1 font-semibold ${
              currentItem.availableStock === 0 
                ? 'text-red-600' 
                : currentItem.availableStock <= 10 
                ? 'text-orange-600' 
                : 'text-green-600'
            }`}>
              {currentItem.availableStock === 0 
                ? '⛔ OUT OF STOCK' 
                : currentItem.availableStock <= 10
                ? `⚠️ LOW STOCK: Only ${currentItem.availableStock} units available`
                : `✓ ${currentItem.availableStock} units available`
              }
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="itemName" className="label">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="name"
              value={currentItem.name}
              onChange={handleItemChange}
              className="input"
              placeholder="e.g., Rice, Sugar, Oil"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={currentItem.quantity}
              onChange={handleItemChange}
              onFocus={handleInputFocus}
              className="input"
              min="1"
              step="1"
            />
          </div>
          <div>
            <label htmlFor="price" className="label">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={currentItem.price}
              onChange={handleItemChange}
              onFocus={handleInputFocus}
              className="input"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Item Total: <span className="font-semibold text-gray-900">
              {formatCurrency(currentItem.quantity * currentItem.price)}
            </span>
          </p>
          <button
            onClick={addItem}
            className="btn btn-primary flex items-center"
          >
            {editingIndex !== null ? (
              <>
                <FaSave className="mr-2" />
                Update Item
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Add Item
              </>
            )}
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Invoice Items ({items.length})
        </h2>
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaShoppingCart className="mx-auto text-5xl text-gray-300 mb-4" />
            <p>No items added yet. Add items above to create invoice.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Item Name
                  </th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">
                    Qty
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-2 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-3 px-2 text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-right">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(item.total)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => editItem(index)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteItem(index)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Summary */}
      {items.length > 0 && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Invoice Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax ({TAX_RATE}%):</span>
              <span className="font-semibold">{formatCurrency(tax)}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total Amount:</span>
              <span className="text-primary-600">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={generateInvoice}
              disabled={loading}
              className="flex-1 btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Invoice'}
            </button>
            <button
              onClick={printInvoice}
              className="btn btn-secondary py-3 flex items-center justify-center"
            >
              <FaPrint className="mr-2" />
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;

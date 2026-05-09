// History Page
// View and manage all invoices with search and filter

import React, { useState, useEffect } from 'react';
import { FaSearch, FaFileInvoice, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import InvoiceCard from '../components/history/InvoiceCard';
import Loader from '../components/common/Loader';
import invoiceService from '../services/invoiceService';
import { formatCurrency, debounce } from '../utils/helpers';

const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch invoices on component mount
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Filter invoices when search query changes
  useEffect(() => {
    filterInvoices();
  }, [searchQuery, invoices]);

  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getAllInvoices();
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  // Filter invoices based on search query
  const filterInvoices = () => {
    if (!searchQuery.trim()) {
      setFilteredInvoices(invoices);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.customerName.toLowerCase().includes(query) ||
        invoice.customerPhone?.toLowerCase().includes(query)
    );
    setFilteredInvoices(filtered);
  };

  // Handle search input change (debounced)
  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  // View invoice details
  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  // Delete invoice
  const deleteInvoice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) {
      return;
    }

    try {
      await invoiceService.deleteInvoice(id);
      toast.success('Invoice deleted successfully');
      // Remove from local state
      setInvoices(invoices.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Failed to delete invoice');
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Invoice History
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all your invoices
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total: <span className="font-semibold text-gray-900">{invoices.length}</span> invoices
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by invoice number, customer name, or phone..."
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            Found <span className="font-semibold">{filteredInvoices.length}</span> result(s)
          </p>
        )}
      </div>

      {/* Invoices Grid */}
      {filteredInvoices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <FaFileInvoice className="mx-auto text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchQuery ? 'No invoices found' : 'No invoices yet'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Create your first invoice to get started'}
          </p>
          {!searchQuery && (
            <a href="/billing" className="btn btn-primary">
              Create Invoice
            </a>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onView={viewInvoice}
              onDelete={deleteInvoice}
            />
          ))}
        </div>
      )}

      {/* Invoice Detail Modal */}
      {showModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Invoice Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Invoice Info */}
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {selectedInvoice.invoiceNumber}
                </h3>
                <p className="text-sm text-primary-700">
                  {new Date(selectedInvoice.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {selectedInvoice.customerName}
                  </p>
                  {selectedInvoice.customerPhone && (
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> {selectedInvoice.customerPhone}
                    </p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Item
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                          Qty
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Price
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items?.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-center">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 text-right">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    {formatCurrency(selectedInvoice.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax:</span>
                  <span className="font-semibold">
                    {formatCurrency(selectedInvoice.tax)}
                  </span>
                </div>
                <div className="border-t-2 border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-primary-600">
                    {formatCurrency(selectedInvoice.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
              <button onClick={closeModal} className="btn btn-secondary">
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;

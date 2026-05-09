// Invoice Card Component
// Displays individual invoice in history page

import React from 'react';
import { FaTrash, FaEye, FaUser, FaPhone, FaCalendar } from 'react-icons/fa';
import { formatCurrency, formatDate } from '../../utils/helpers';

const InvoiceCard = ({ invoice, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 border-l-4 border-primary-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {invoice.invoiceNumber}
          </h3>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <FaCalendar className="mr-2" />
            {formatDate(invoice.createdAt)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(invoice)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <FaEye />
          </button>
          <button
            onClick={() => onDelete(invoice.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Invoice"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-700">
          <FaUser className="mr-2 text-gray-400" />
          <span className="font-medium">{invoice.customerName}</span>
        </div>
        {invoice.customerPhone && (
          <div className="flex items-center text-gray-600 text-sm">
            <FaPhone className="mr-2 text-gray-400" />
            <span>{invoice.customerPhone}</span>
          </div>
        )}
      </div>

      {/* Items Count */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {invoice.items?.length || 0}
          </span>{' '}
          item(s) purchased
        </p>
      </div>

      {/* Total Amount */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Amount:</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(invoice.total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;

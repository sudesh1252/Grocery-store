// Invoice Card Component
// Displays invoice information in history page

import React from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

const InvoiceCard = ({ invoice, onDelete, onView }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="invoice-card">
      <div className="invoice-header">
        <div>
          <h3 className="invoice-number">{invoice.invoiceNumber}</h3>
          <p className="invoice-date">{formatDate(invoice.createdAt)}</p>
        </div>
        <div className="invoice-actions">
          <button 
            className="btn-icon btn-view" 
            onClick={() => onView(invoice)}
            title="View Details"
          >
            <FaEye />
          </button>
          <button 
            className="btn-icon btn-delete" 
            onClick={() => onDelete(invoice._id)}
            title="Delete Invoice"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="invoice-body">
        <div className="invoice-info">
          <span className="info-label">Customer:</span>
          <span className="info-value">{invoice.customerName}</span>
        </div>
        {invoice.customerPhone && (
          <div className="invoice-info">
            <span className="info-label">Phone:</span>
            <span className="info-value">{invoice.customerPhone}</span>
          </div>
        )}
        <div className="invoice-info">
          <span className="info-label">Items:</span>
          <span className="info-value">{invoice.items.length} item(s)</span>
        </div>
      </div>
      
      <div className="invoice-footer">
        <span className="total-label">Total Amount:</span>
        <span className="total-value">₹{invoice.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default InvoiceCard;

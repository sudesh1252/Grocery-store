// Dashboard Page
// Main dashboard with real-time statistics and analytics

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRupeeSign, 
  FaFileInvoice, 
  FaChartLine, 
  FaCalendarDay,
  FaPlus,
  FaBox
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import StatCard from '../components/dashboard/StatCard';
import Loader from '../components/common/Loader';
import invoiceService from '../services/invoiceService';
import { formatCurrency } from '../utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentInvoices, setRecentInvoices] = useState([]);

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch statistics
      const statsResponse = await invoiceService.getDashboardStats();
      setStats(statsResponse.data);

      // Fetch recent invoices
      const invoicesResponse = await invoiceService.getAllInvoices();
      setRecentInvoices(invoicesResponse.data.slice(0, 5)); // Get last 5 invoices

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
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
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Here's your store overview
          </p>
        </div>
        <Link
          to="/billing"
          className="mt-4 sm:mt-0 inline-flex items-center btn btn-primary"
        >
          <FaPlus className="mr-2" />
          Create Invoice
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={formatCurrency(stats?.totalSales || 0)}
          icon={<FaRupeeSign />}
          color="#10b981"
          subtitle="All time revenue"
        />
        <StatCard
          title="Total Invoices"
          value={stats?.totalInvoices || 0}
          icon={<FaFileInvoice />}
          color="#3b82f6"
          subtitle="Total bills generated"
        />
        <StatCard
          title="Today's Revenue"
          value={formatCurrency(stats?.todayRevenue || 0)}
          icon={<FaCalendarDay />}
          color="#f59e0b"
          subtitle="Sales today"
        />
        <StatCard
          title="Today's Invoices"
          value={stats?.todayInvoices || 0}
          icon={<FaChartLine />}
          color="#8b5cf6"
          subtitle="Bills created today"
        />
      </div>

      {/* Recent Invoices Section */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
          <Link
            to="/history"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentInvoices.length === 0 ? (
          <div className="text-center py-12">
            <FaFileInvoice className="mx-auto text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">No invoices yet</p>
            <Link to="/billing" className="btn btn-primary">
              Create Your First Invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Invoice #
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-primary-600">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {invoice.customerName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(invoice.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {invoice.items?.length || 0} items
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                      {formatCurrency(invoice.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/billing"
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group"
        >
          <FaPlus className="text-3xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-1">New Invoice</h3>
          <p className="text-sm text-primary-100">Create a new bill</p>
        </Link>

        <Link
          to="/history"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group"
        >
          <FaFileInvoice className="text-3xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-1">View History</h3>
          <p className="text-sm text-blue-100">Browse all invoices</p>
        </Link>

        <Link
          to="/inventory"
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group"
        >
          <FaBox className="text-3xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-1">Inventory</h3>
          <p className="text-sm text-blue-100">Manage products</p>
        </Link>

        <Link
          to="/reports"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group"
        >
          <FaChartLine className="text-3xl mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-lg font-semibold mb-1">Reports</h3>
          <p className="text-sm text-purple-100">View sales analytics</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

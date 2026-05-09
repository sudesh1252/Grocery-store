// Reports Page
// View daily, monthly, and yearly sales reports

import React, { useState, useEffect } from 'react';
import { FaChartLine, FaCalendarDay, FaCalendarAlt, FaCalendar, FaPrint, FaFileExport, FaRupeeSign, FaFileInvoice } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';
import { getReports } from '../services/reportService';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('daily'); // daily, monthly, yearly
  const [reportData, setReportData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReport();
  }, [reportType, selectedDate, selectedMonth, selectedYear]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      let data;
      if (reportType === 'daily') {
        data = await getReports.daily(selectedDate);
      } else if (reportType === 'monthly') {
        data = await getReports.monthly(selectedYear, selectedMonth);
      } else if (reportType === 'yearly') {
        data = await getReports.yearly(selectedYear);
      }
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    toast.info('Export feature coming soon!');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          .printable-area,
          .printable-area * {
            visibility: visible;
          }
          
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-white {
            background: white !important;
            color: black !important;
          }
          
          @page {
            margin: 1.5cm;
            size: A4;
          }
          
          table {
            page-break-inside: auto;
          }
          
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          .print-title {
            display: block !important;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        {/* Header - No Print */}
        <div className="mb-8 no-print">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Sales Reports
          </h1>
          <p className="text-gray-600">Analyze your business performance</p>
        </div>

        {/* Controls Card - No Print */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 no-print">
          {/* Report Type Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setReportType('daily')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                reportType === 'daily'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaCalendarDay className="text-lg" />
              Daily
            </button>
            <button
              onClick={() => setReportType('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                reportType === 'monthly'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaCalendarAlt className="text-lg" />
              Monthly
            </button>
            <button
              onClick={() => setReportType('yearly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                reportType === 'yearly'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaCalendar className="text-lg" />
              Yearly
            </button>
          </div>

          {/* Date Selectors and Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Date Selectors */}
            <div className="flex gap-3 flex-wrap">
              {reportType === 'daily' && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              )}
              {reportType === 'monthly' && (
                <>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    min="2020"
                    max="2030"
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 transition-all"
                  />
                </>
              )}
              {reportType === 'yearly' && (
                <input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  min="2020"
                  max="2030"
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-28 transition-all"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={printReport}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
              >
                <FaPrint className="text-lg" />
                Print
              </button>
              <button
                onClick={exportReport}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
              >
                <FaFileExport className="text-lg" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : reportData ? (
          <div className="printable-area">
            {/* Print Header - Only visible when printing */}
            <div className="print-title" style={{ display: 'none' }}>
              <h1>Shree Grocery Store</h1>
              <h2>
                {reportType === 'daily' && `Daily Report - ${new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                {reportType === 'monthly' && `Monthly Report - ${new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`}
                {reportType === 'yearly' && `Yearly Report - ${selectedYear}`}
              </h2>
              <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 print-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Total Sales</h3>
                  <FaRupeeSign className="text-3xl opacity-80" />
                </div>
                <p className="text-4xl font-bold mb-2">
                  ₹{reportData.data?.summary?.totalSales?.toLocaleString('en-IN') || 0}
                </p>
                <p className="text-sm opacity-90">
                  {reportType === 'daily' && 'Today'}
                  {reportType === 'monthly' && 'This Month'}
                  {reportType === 'yearly' && 'This Year'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 print-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Total Invoices</h3>
                  <FaFileInvoice className="text-3xl opacity-80" />
                </div>
                <p className="text-4xl font-bold mb-2">
                  {reportData.data?.summary?.totalInvoices || 0}
                </p>
                <p className="text-sm opacity-90">Invoices generated</p>
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 print-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Average Sale</h3>
                  <FaChartLine className="text-3xl opacity-80" />
                </div>
                <p className="text-4xl font-bold mb-2">
                  ₹{((reportData.data?.summary?.totalSales || 0) / (reportData.data?.summary?.totalInvoices || 1)).toFixed(2)}
                </p>
                <p className="text-sm opacity-90">Per invoice</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaChartLine className="text-blue-600" />
                {reportType === 'daily' && 'Hourly Sales Breakdown'}
                {reportType === 'monthly' && 'Daily Sales Breakdown'}
                {reportType === 'yearly' && 'Monthly Sales Breakdown'}
              </h2>

              {/* Bar Chart */}
              <div className="space-y-3">
                {reportType === 'daily' &&
                  reportData.data?.salesByHour
                    ?.filter((item) => item.sales > 0)
                    .map((item) => (
                      <div key={item.hour} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-bold text-gray-700">
                          {item.hour}:00
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden h-12">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full flex items-center justify-end px-4 text-white font-bold transition-all duration-700 hover:from-blue-600 hover:to-cyan-600"
                            style={{
                              width: `${Math.max((item.sales / Math.max(...reportData.data.salesByHour.map((h) => h.sales))) * 100, 5)}%`,
                            }}
                          >
                            ₹{item.sales.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {item.invoices} bills
                        </div>
                      </div>
                    ))}

                {reportType === 'monthly' &&
                  reportData.data?.salesByDay
                    ?.filter((item) => item.sales > 0)
                    .map((item) => (
                      <div key={item.day} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-bold text-gray-700">
                          Day {item.day}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden h-12">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full flex items-center justify-end px-4 text-white font-bold transition-all duration-700 hover:from-indigo-600 hover:to-purple-600"
                            style={{
                              width: `${Math.max((item.sales / Math.max(...reportData.data.salesByDay.map((d) => d.sales))) * 100, 5)}%`,
                            }}
                          >
                            ₹{item.sales.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {item.invoices} bills
                        </div>
                      </div>
                    ))}

                {reportType === 'yearly' &&
                  reportData.data?.salesByMonth
                    ?.filter((item) => item.sales > 0)
                    .map((item) => (
                      <div key={item.month} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-bold text-gray-700">
                          {new Date(2000, item.month - 1).toLocaleString('default', { month: 'short' })}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden h-12">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-green-500 h-full flex items-center justify-end px-4 text-white font-bold transition-all duration-700 hover:from-teal-600 hover:to-green-600"
                            style={{
                              width: `${Math.max((item.sales / Math.max(...reportData.data.salesByMonth.map((m) => m.sales))) * 100, 5)}%`,
                            }}
                          >
                            ₹{item.sales.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="w-20 text-sm text-gray-600 text-right">
                          {item.invoices} bills
                        </div>
                      </div>
                    ))}
              </div>

              {/* No Data Message */}
              {((reportType === 'daily' && reportData.data?.salesByHour?.every((h) => h.sales === 0)) ||
                (reportType === 'monthly' && reportData.data?.salesByDay?.every((d) => d.sales === 0)) ||
                (reportType === 'yearly' && reportData.data?.salesByMonth?.every((m) => m.sales === 0))) && (
                <div className="text-center py-12">
                  <FaChartLine className="text-6xl mx-auto mb-4 text-gray-300" />
                  <p className="text-xl font-bold text-gray-400 mb-2">No sales data available</p>
                  <p className="text-gray-500">Start creating invoices to see reports</p>
                </div>
              )}
            </div>

            {/* Recent Invoices Table */}
            {reportData.data?.invoices && reportData.data.invoices.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FaFileInvoice className="text-blue-600" />
                  Recent Invoices
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Invoice #</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-700">Date</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.data.invoices.slice(0, 10).map((invoice, index) => (
                        <tr 
                          key={invoice.id} 
                          className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <td className="py-3 px-4 font-bold text-blue-600">
                            {invoice.invoiceNumber}
                          </td>
                          <td className="py-3 px-4 text-gray-800">{invoice.customerName}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(invoice.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-gray-900">
                            ₹{parseFloat(invoice.total).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <FaChartLine className="text-8xl text-gray-300 mx-auto mb-6" />
            <p className="text-2xl font-bold text-gray-400">No report data available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;

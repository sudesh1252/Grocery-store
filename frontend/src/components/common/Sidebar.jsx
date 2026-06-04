// Sidebar Component
// Navigation sidebar with menu items

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaFileInvoice, 
  FaHistory, 
  FaTimes,
  FaShoppingCart,
  FaChartLine,
  FaBox,
  FaUserCircle
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Menu items configuration
  const menuItems = [
    { 
      path: '/dashboard', 
      icon: <FaHome className="text-xl" />, 
      label: 'Dashboard' 
    },
    { 
      path: '/billing', 
      icon: <FaFileInvoice className="text-xl" />, 
      label: 'Billing' 
    },
    { 
      path: '/history', 
      icon: <FaHistory className="text-xl" />, 
      label: 'History' 
    },
    { 
      path: '/inventory', 
      icon: <FaBox className="text-xl" />, 
      label: 'Inventory' 
    },
    { 
      path: '/reports', 
      icon: <FaChartLine className="text-xl" />, 
      label: 'Reports' 
    },
    { 
      path: '/profile', 
      icon: <FaUserCircle className="text-xl" />, 
      label: 'Profile' 
    },
  ];

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicked */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Shree Grocery</h1>
              <p className="text-xs text-gray-500">Billing System</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p className="font-medium">© 2026 Shree Grocery</p>
            <p className="text-xs mt-1">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

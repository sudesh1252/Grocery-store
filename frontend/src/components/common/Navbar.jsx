// Navbar Component
// Top navigation bar with menu toggle and user info

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              Welcome back, {user?.name || 'User'}!
            </h2>
          </div>

          {/* Right side - User menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-primary-600 text-2xl" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'admin' ? 'Administrator' : 'Store Manager'}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                ></div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      // Navigate to profile page (to be implemented)
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUser />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

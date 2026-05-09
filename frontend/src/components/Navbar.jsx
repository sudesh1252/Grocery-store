// Navbar Component
// Top navigation bar with menu toggle and user info

import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      {/* Left side - Menu toggle button */}
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1 className="page-title">Shree Grocery Store</h1>
      </div>

      {/* Right side - User info */}
      <div className="navbar-right">
        <div className="user-info">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-details">
            <span className="user-name">Admin</span>
            <span className="user-role">Store Manager</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

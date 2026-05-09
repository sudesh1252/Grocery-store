// Sidebar Component
// Navigation sidebar with menu items

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFileInvoice, FaHistory, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Menu items configuration
  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/billing', icon: <FaFileInvoice />, label: 'Billing' },
    { path: '/history', icon: <FaHistory />, label: 'History' },
  ];

  return (
    <>
      {/* Overlay for mobile - closes sidebar when clicked */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Shree Grocery</span>
          </div>
          {/* Close button for mobile */}
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => window.innerWidth <= 768 && toggleSidebar()}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <p>© 2026 Shree Grocery</p>
          <p className="version">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

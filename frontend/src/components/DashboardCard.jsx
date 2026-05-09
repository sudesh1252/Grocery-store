// Dashboard Card Component
// Reusable card for displaying statistics

import React from 'react';

const DashboardCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className="dashboard-card" style={{ borderTopColor: color }}>
      <div className="card-content">
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <p className="card-value">{value}</p>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        <div className="card-icon" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

// Statistics Card Component
// Reusable card for displaying dashboard metrics

import React from 'react';

const StatCard = ({ title, value, icon, color, subtitle, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`inline-flex items-center mt-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{trend.value}</span>
            </div>
          )}
        </div>
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

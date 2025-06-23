import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-800 rounded-xl shadow p-6 border border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

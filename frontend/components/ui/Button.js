import React from 'react';

export default function Button({ children, onClick, type = 'button', color = 'blue', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded font-bold shadow bg-${color}-600 hover:bg-${color}-700 text-white transition ${className}`}
    >
      {children}
    </button>
  );
}

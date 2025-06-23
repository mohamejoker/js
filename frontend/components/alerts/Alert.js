import React from 'react';

export default function Alert({ type = 'info', message }) {
  const color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue';
  return (
    <div className={`w-full text-center py-2 px-4 rounded mb-4 bg-${color}-900 text-${color}-300 border border-${color}-700 shadow animate-fade-in`}>
      {message}
    </div>
  );
}

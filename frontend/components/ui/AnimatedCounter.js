import React from 'react';

export default function AnimatedCounter({ value, label }) {
  // عداد متحرك بسيط
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow text-blue-400">
      <span className="text-3xl font-bold animate-pulse">{value}</span>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  );
}

import React from 'react';

export default function ServiceCard({ title, description, price, icon }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center max-w-xs mx-auto border border-gray-700 hover:border-blue-400 transition">
      {icon && <div className="mb-3 text-blue-400 text-4xl">{icon}</div>}
      <h3 className="text-lg font-bold text-blue-400 mb-2">{title}</h3>
      <p className="text-gray-200 mb-2">{description}</p>
      <span className="text-green-400 font-bold mt-2">{price} ر.س</span>
    </div>
  );
}

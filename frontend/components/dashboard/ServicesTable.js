import React from 'react';

export default function ServicesTable({ services }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-4">الخدمات</h2>
      <ul>
        {services.map(service => (
          <li key={service.id} className="mb-2 border-b border-gray-700 pb-2">
            <span className="font-bold">{service.title}</span>
            {service.description && <span className="text-gray-400"> - {service.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

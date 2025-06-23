import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-bold">{label}</label>}
      <input className="w-full border rounded px-3 py-2" {...props} />
    </div>
  );
}

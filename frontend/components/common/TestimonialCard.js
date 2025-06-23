import React from 'react';

export default function TestimonialCard({ name, text, avatar }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center max-w-xs mx-auto">
      {avatar && <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-3 border-2 border-blue-400" />}
      <p className="text-gray-200 mb-2">{text}</p>
      <span className="text-blue-400 font-bold text-sm mt-2">{name}</span>
    </div>
  );
}

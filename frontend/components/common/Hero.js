import React from 'react';

export default function Hero({ title, subtitle, image }) {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-center">
      {image && <img src={image} alt="Hero" className="mb-6 rounded-lg shadow-lg max-h-56" />}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-blue-400 drop-shadow-lg">{title}</h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-4 animate-fade-in max-w-2xl mx-auto">{subtitle}</p>
    </section>
  );
}

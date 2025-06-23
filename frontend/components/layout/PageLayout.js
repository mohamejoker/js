import React from 'react';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

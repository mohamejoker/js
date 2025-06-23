import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* يمكن إضافة شريط جانبي أو ترويسة هنا */}
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
}

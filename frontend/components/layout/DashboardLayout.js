import React from 'react';

export default function DashboardLayout({ children, user }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="w-full bg-gray-900 border-b border-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-400 tracking-widest">لوحة التحكم</span>
          <span className="text-sm text-gray-400">{user?.name || 'مشرف'}</span>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="w-full mt-8"><span className="text-xs text-gray-600 block text-center">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</span></footer>
    </div>
  );
}

import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" dir="rtl">
      <h1 className="text-6xl font-bold mb-4 text-blue-500">404</h1>
      <p className="text-2xl mb-6">الصفحة غير موجودة</p>
      <a href="/" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للرئيسية</a>
    </div>
  );
}

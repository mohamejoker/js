import React from 'react';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" dir="rtl">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6"></div>
      <h1 className="text-2xl font-bold">جاري التحميل...</h1>
    </div>
  );
}

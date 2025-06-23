import React from 'react';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" dir="rtl">
      <h1 className="text-4xl font-bold mb-4 text-blue-400">قريباً</h1>
      <p className="text-lg mb-6">هذه الصفحة أو الخدمة ستتوفر قريباً. تابعنا للمزيد من التحديثات.</p>
      <a href="/" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للرئيسية</a>
    </div>
  );
}

import React from 'react';

export default function CancelOrderPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">تم إلغاء الطلب</h1>
      <p className="text-lg mb-6">عذراً، تم إلغاء طلبك. إذا كان لديك استفسار تواصل مع الدعم.</p>
      <a href="/dashboard" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للوحة التحكم</a>
    </div>
  );
}

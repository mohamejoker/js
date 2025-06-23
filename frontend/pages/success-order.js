import React from 'react';

export default function SuccessOrderPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">تم استلام طلبك بنجاح</h1>
      <p className="text-lg mb-6">شكراً لثقتك بنا! سيتم تنفيذ طلبك في أقرب وقت.</p>
      <a href="/dashboard" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">الذهاب للوحة التحكم</a>
    </div>
  );
}

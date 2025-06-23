import React from 'react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">تمت العملية بنجاح</h1>
      <p className="text-lg mb-6">شكراً لاستخدامك منصتنا. سنقوم بمعالجة طلبك والتواصل معك قريباً.</p>
      <a href="/" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للرئيسية</a>
    </div>
  );
}

import React from 'react';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">حدث خطأ</h1>
      <p className="text-lg mb-6">عذراً، حدث خطأ أثناء تنفيذ العملية. يرجى المحاولة لاحقاً أو التواصل مع الدعم.</p>
      <a href="/" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للرئيسية</a>
    </div>
  );
}

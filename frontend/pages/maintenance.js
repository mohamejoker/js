import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-yellow-900" dir="rtl">
      <h1 className="text-4xl font-bold mb-4">الصيانة الدورية</h1>
      <p className="text-lg mb-6">نعتذر، الموقع تحت الصيانة حالياً. سنعود للعمل قريباً جداً.</p>
      <a href="/" className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold">العودة للرئيسية</a>
    </div>
  );
}

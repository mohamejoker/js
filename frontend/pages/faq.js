import React from 'react';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">الأسئلة الشائعة</h1>
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">كيف أبدأ باستخدام المنصة؟</h2>
          <p className="text-gray-700">يمكنك التسجيل مجانًا ثم تسجيل الدخول والبدء في طلب الخدمات مباشرة من لوحة التحكم.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">هل الخدمات آمنة؟</h2>
          <p className="text-gray-700">نعم، جميع الخدمات آمنة ويتم تنفيذها بسرية تامة مع ضمان حماية بياناتك.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">كيف يمكنني التواصل مع الدعم؟</h2>
          <p className="text-gray-700">يمكنك التواصل معنا عبر صفحة اتصل بنا أو عبر البريد الإلكتروني أو الواتساب.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">ما هي طرق الدفع المتاحة؟</h2>
          <p className="text-gray-700">نوفر عدة طرق دفع آمنة تشمل التحويل البنكي، مدى، STC Pay، وغيرها.</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">هل يمكن استرجاع المبلغ؟</h2>
          <p className="text-gray-700">نعم، في حال لم يتم تنفيذ الخدمة أو حدث خطأ، يمكنك طلب استرجاع المبلغ وفق الشروط والأحكام.</p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function InstagramFollowersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-pink-500">زيادة متابعين انستجرام</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-4 text-center">احصل على متابعين حقيقيين وتفاعل مضمون لحسابك على انستجرام بسرعة وأمان.</p>
      <div className="text-2xl font-bold text-green-600 mb-6">99 ر.س لكل 1000 متابع</div>
      <ul className="mb-8 max-w-md mx-auto text-right">
        <li className="mb-2 text-gray-700">- متابعين حقيقيين</li>
        <li className="mb-2 text-gray-700">- بدون فقدان</li>
        <li className="mb-2 text-gray-700">- تنفيذ فوري</li>
        <li className="mb-2 text-gray-700">- دعم فني متواصل</li>
      </ul>
      <a href="/register" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded">اطلب الخدمة الآن</a>
    </div>
  );
}

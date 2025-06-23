import React from 'react';

export default function TiktokLikesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-black">لايكات تيك توك</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-4 text-center">رفع التفاعل على فيديوهاتك في تيك توك مع ضمان لايكات حقيقية وسريعة.</p>
      <div className="text-2xl font-bold text-green-600 mb-6">59 ر.س لكل 1000 لايك</div>
      <ul className="mb-8 max-w-md mx-auto text-right">
        <li className="mb-2 text-gray-700">- لايكات حقيقية</li>
        <li className="mb-2 text-gray-700">- تنفيذ فوري</li>
        <li className="mb-2 text-gray-700">- بدون حظر</li>
        <li className="mb-2 text-gray-700">- دعم فني متواصل</li>
      </ul>
      <a href="/register" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded">اطلب الخدمة الآن</a>
    </div>
  );
}

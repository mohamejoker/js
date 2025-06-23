import React from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">المدونة</h1>
      <div className="max-w-2xl w-full text-center">
        <p className="text-lg text-gray-700 mb-8">تابع أحدث المقالات والنصائح حول التسويق الرقمي ووسائل التواصل الاجتماعي.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600">5 أسرار لزيادة متابعينك بسرعة</h2>
            <p className="text-gray-700 mb-2">تعرف على أفضل الطرق المجربة لزيادة متابعينك على انستجرام وتويتر وتيك توك.</p>
            <a href="#" className="text-blue-500 hover:underline">اقرأ المزيد</a>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-2 text-blue-600">كيف تختار الخدمة الأنسب لحسابك؟</h2>
            <p className="text-gray-700 mb-2">دليل عملي لاختيار الخدمة التي تناسب أهدافك التسويقية.</p>
            <a href="#" className="text-blue-500 hover:underline">اقرأ المزيد</a>
          </div>
        </div>
      </div>
    </div>
  );
}

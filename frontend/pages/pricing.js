import React from 'react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">الباقات والأسعار</h1>
      <div className="max-w-2xl w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2 text-blue-600">الباقة الأساسية</h2>
            <div className="text-3xl font-bold mb-2">99 ر.س</div>
            <ul className="text-gray-700 mb-4 text-sm text-right">
              <li>1000 متابع</li>
              <li>دعم فوري</li>
              <li>تقرير أسبوعي</li>
            </ul>
            <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">اشترك الآن</a>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-6 flex flex-col items-center border-2 border-blue-600">
            <h2 className="text-xl font-bold mb-2 text-blue-600">الباقة المميزة</h2>
            <div className="text-3xl font-bold mb-2">299 ر.س</div>
            <ul className="text-gray-700 mb-4 text-sm text-right">
              <li>5000 متابع</li>
              <li>دعم 24/7</li>
              <li>تقارير مفصلة</li>
            </ul>
            <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">اشترك الآن</a>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2 text-blue-600">الباقة الاحترافية</h2>
            <div className="text-3xl font-bold mb-2">599 ر.س</div>
            <ul className="text-gray-700 mb-4 text-sm text-right">
              <li>15000 متابع</li>
              <li>دعم خاص</li>
              <li>تقارير يومية</li>
            </ul>
            <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">اشترك الآن</a>
          </div>
        </div>
      </div>
    </div>
  );
}

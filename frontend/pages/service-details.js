import React from 'react';

export default function ServiceDetailsPage({ service }) {
  // بيانات افتراضية للخدمة، يمكن ربطها بـ API لاحقًا
  const data = service || {
    title: 'زيادة متابعين انستجرام',
    description: 'متابعين حقيقيين وتفاعل مضمون لحسابك على انستجرام. الخدمة الأسرع والأكثر أماناً في السوق.',
    price: '99 ر.س لكل 1000 متابع',
    features: [
      'متابعين حقيقيين',
      'بدون فقدان',
      'تنفيذ فوري',
      'دعم فني متواصل'
    ]
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">{data.title}</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-4 text-center">{data.description}</p>
      <div className="text-2xl font-bold text-green-600 mb-6">{data.price}</div>
      <ul className="mb-8 max-w-md mx-auto text-right">
        {data.features.map((f, i) => <li key={i} className="mb-2 text-gray-700">- {f}</li>)}
      </ul>
      <a href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded">اطلب الخدمة الآن</a>
    </div>
  );
}

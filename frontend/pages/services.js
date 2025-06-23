import React, { useState } from 'react';

const categories = [
  { key: 'instagram', label: 'انستجرام' },
  { key: 'snapchat', label: 'سناب شات' },
  { key: 'tiktok', label: 'تيك توك' },
  { key: 'youtube', label: 'يوتيوب' },
  { key: 'twitter', label: 'تويتر' }
];

const servicesData = {
  instagram: [
    {
      title: 'زيادة متابعين انستجرام',
      description: 'متابعين حقيقيين وتفاعل مضمون لحسابك.',
      price: '99 ر.س لكل 1000 متابع',
      color: 'bg-pink-500',
    },
    {
      title: 'لايكات انستجرام',
      description: 'رفع التفاعل على منشوراتك.',
      price: '29 ر.س لكل 1000 لايك',
      color: 'bg-pink-400',
    },
  ],
  snapchat: [
    {
      title: 'مشاهدات سناب شات',
      description: 'زيادة مشاهدات سناباتك بسرعة وأمان.',
      price: '79 ر.س لكل 1000 مشاهدة',
      color: 'bg-yellow-500',
    },
  ],
  tiktok: [
    {
      title: 'لايكات تيك توك',
      description: 'رفع التفاعل على فيديوهاتك في تيك توك.',
      price: '39 ر.س لكل 1000 لايك',
      color: 'bg-black',
    },
    {
      title: 'متابعين تيك توك',
      description: 'زيادة متابعين تيك توك بسرعة.',
      price: '89 ر.س لكل 1000 متابع',
      color: 'bg-black',
    },
  ],
  youtube: [
    {
      title: 'مشاهدات يوتيوب',
      description: 'زيادة مشاهدات فيديوهاتك على يوتيوب.',
      price: '59 ر.س لكل 1000 مشاهدة',
      color: 'bg-red-600',
    },
    {
      title: 'مشتركين يوتيوب',
      description: 'زيادة مشتركين قناتك.',
      price: '199 ر.س لكل 1000 مشترك',
      color: 'bg-red-500',
    },
  ],
  twitter: [
    {
      title: 'متابعين تويتر',
      description: 'زيادة متابعين تويتر.',
      price: '109 ر.س لكل 1000 متابع',
      color: 'bg-blue-400',
    },
    {
      title: 'إعجابات تويتر',
      description: 'رفع التفاعل على تغريداتك.',
      price: '35 ر.س لكل 1000 إعجاب',
      color: 'bg-blue-300',
    },
  ],
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('instagram');
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-10 text-blue-600">خدماتنا</h1>
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-6 py-2 rounded-full font-bold border-2 transition text-lg ${activeCategory === cat.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {servicesData[activeCategory].map((service, i) => (
          <div key={i} className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
            <h2 className={`text-xl font-bold mb-2 ${service.color}`}>{service.title}</h2>
            <p className="text-gray-700 mb-2">{service.description}</p>
            <div className="text-green-600 font-bold mb-2">{service.price}</div>
            <a href="/register" className={`mt-2 px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold`}>اطلب الآن</a>
          </div>
        ))}
      </div>
    </div>
  );
}
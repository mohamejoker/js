import React from 'react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">شركاؤنا</h1>
      <div className="max-w-2xl w-full text-center">
        <p className="text-lg text-gray-700 mb-8">نفخر بالتعاون مع نخبة من أفضل الشركات والمنصات التقنية في المنطقة والعالم.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          <img src="/partners/partner1.png" alt="شريك 1" className="h-16 mx-auto" />
          <img src="/partners/partner2.png" alt="شريك 2" className="h-16 mx-auto" />
          <img src="/partners/partner3.png" alt="شريك 3" className="h-16 mx-auto" />
          <img src="/partners/partner4.png" alt="شريك 4" className="h-16 mx-auto" />
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">اتصل بنا</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-8 text-center">
        يمكنك التواصل معنا عبر البريد الإلكتروني أو الواتساب أو من خلال النموذج أدناه. فريق الدعم متواجد لخدمتك على مدار الساعة.
      </p>
      <form className="w-full max-w-md bg-gray-50 rounded-xl shadow p-8 flex flex-col gap-4">
        <input type="text" placeholder="الاسم" className="p-3 rounded bg-white border border-gray-300 focus:outline-none" />
        <input type="email" placeholder="البريد الإلكتروني" className="p-3 rounded bg-white border border-gray-300 focus:outline-none" />
        <textarea placeholder="رسالتك" rows={4} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded">إرسال</button>
      </form>
      <div className="mt-8 text-gray-600 text-sm text-center">
        البريد: <a href="mailto:support@myapp.com" className="text-blue-600">support@myapp.com</a> | واتساب: <a href="https://wa.me/966500000000" className="text-green-600">+966500000000</a>
      </div>
    </div>
  );
}

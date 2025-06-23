import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [footerText, setFooterText] = useState('جميع الحقوق محفوظة لـ Town Media');
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setFooterText(data.footerText || 'جميع الحقوق محفوظة لـ Town Media'));
  }, []);
  return (
    <footer className="mt-20 w-full flex flex-col items-center justify-center bg-gray-900 py-6 border-t border-gray-800 text-gray-400 text-sm opacity-90 animate-fade-in shadow-inner">
      <span className="tracking-wide font-medium">{footerText}</span>
      <span className="mt-2 text-xs text-gray-600">جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</span>
      <a href="/faq" className="text-gray-400 hover:text-white transition-colors">
        الأسئلة الشائعة
      </a>
      <a href="/partners" className="text-gray-400 hover:text-white transition-colors">
        شركاؤنا
      </a>
      <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
        المدونة
      </a>
      <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
        الباقات والأسعار
      </a>
      <a href="/service-details" className="text-gray-400 hover:text-white transition-colors">
        تفاصيل الخدمة
      </a>
      <a href="/instagram-followers" className="text-gray-400 hover:text-pink-500 transition-colors">
        متابعين انستجرام
      </a>
    </footer>
  );
}

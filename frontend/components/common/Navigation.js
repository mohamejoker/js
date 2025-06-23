import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Sparkles, Menu, X, Globe } from 'lucide-react';

export default function Navigation({ user }) {
  const [siteTitle, setSiteTitle] = useState('Town Media');
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setSiteTitle(data.siteTitle || 'Town Media'));
  }, []);
  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-blue-400 tracking-widest">{siteTitle}</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/services" className="text-gray-300 hover:text-blue-400 transition font-medium">الخدمات</a>
        <a href="/dashboard" className="text-gray-300 hover:text-purple-400 transition font-medium">لوحة التحكم</a>
        <a href="/reports" className="text-gray-300 hover:text-green-400 transition font-medium">التقارير</a>
        {user ? (
          <a href="/logout" className="text-red-400 hover:text-red-600 font-bold transition">تسجيل الخروج</a>
        ) : (
          <a href="/login" className="text-blue-400 hover:text-blue-600 font-bold transition">تسجيل الدخول</a>
        )}
      </div>
    </nav>
  );
}

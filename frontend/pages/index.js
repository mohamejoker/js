import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // توجيه المستخدمين حسب حالة المصادقة
    const token = getAuthToken();

    if (token) {
      // إذا كان المستخدم مسجل الدخول، توجيهه للوحة التحكم
      router.replace('/dashboard');
    } else {
      // إذا لم يكن مسجل الدخول، توجيهه لصفحة الهبوط
      router.replace('/landing');
    }
  }, [router]);

  // صفحة تحميل أثناء التوجيه
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Town Media Agent</h1>
        <p className="text-blue-200">جاري التحميل...</p>
      </div>
    </div>
  );
}

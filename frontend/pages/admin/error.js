import React from 'react';
import Link from 'next/link';

export default function AdminError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600 mb-4">خطأ في لوحة الأدمن</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">حدث خطأ أو ليس لديك صلاحية الوصول.</p>
      <Link href="/login-admin">
        <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">تسجيل الدخول</a>
      </Link>
    </div>
  );
}

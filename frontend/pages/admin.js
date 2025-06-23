import React from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10">لوحة تحكم المدير</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link href="/manage-users" legacyBehavior>
          <a className="bg-blue-700 hover:bg-blue-800 rounded-xl p-8 text-center font-bold text-2xl shadow transition">إدارة المستخدمين</a>
        </Link>
        <Link href="/manage-services" legacyBehavior>
          <a className="bg-purple-700 hover:bg-purple-800 rounded-xl p-8 text-center font-bold text-2xl shadow transition">إدارة الخدمات</a>
        </Link>
        <Link href="/add-distributor" legacyBehavior>
          <a className="bg-green-700 hover:bg-green-800 rounded-xl p-8 text-center font-bold text-2xl shadow transition">إعداد رابط الموزع</a>
        </Link>
        <Link href="/dashboard" legacyBehavior>
          <a className="bg-gray-700 hover:bg-gray-800 rounded-xl p-8 text-center font-bold text-2xl shadow transition">عرض لوحة البيانات</a>
        </Link>
      </div>
    </div>
  );
}

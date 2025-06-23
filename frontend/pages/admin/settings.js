import React from 'react';

export default function AdminSettings() {
  // لاحقًا: ربط الإعدادات مع API
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">إعدادات الموقع</h1>
      <div className="bg-white rounded shadow p-4">
        <p>تغيير اسم الموقع، الألوان، اللوجو، نص الترحيب، إلخ.</p>
      </div>
    </div>
  );
}

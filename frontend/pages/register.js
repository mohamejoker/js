import React, { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    // استدعاء API لإضافة مستخدم جديد (يمكن ربطه لاحقًا)
    setMessage('تم إرسال طلب التسجيل بنجاح! سيتم مراجعة بياناتك والتواصل معك قريبًا.');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">إنشاء حساب جديد</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-50 rounded-xl shadow p-8 flex flex-col gap-4">
        <input type="text" name="username" placeholder="اسم المستخدم" value={form.username} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="password" name="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded">تسجيل</button>
        {message && <div className="text-green-600 text-center mt-2">{message}</div>}
      </form>
      <div className="mt-6 text-center">
        <span className="text-gray-500">هل أنت أدمن؟ </span>
        <a href="/register-admin" className="text-red-600 hover:underline font-bold">تسجيل أدمن جديد</a>
      </div>
    </div>
  );
}

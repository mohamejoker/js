import React, { useState } from 'react';

export default function RegisterAdminPage() {
  const [form, setForm] = useState({ username: '', password: '', email: '', inviteCode: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    if (form.inviteCode !== 'ADMIN2025') {
      setMessage('كود الدعوة غير صحيح.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password })
      });
      if (res.ok) {
        setMessage('تم إرسال طلب تسجيل الأدمن بنجاح! سيتم مراجعة بياناتك والتواصل معك قريبًا.');
      } else {
        const data = await res.json();
        setMessage(data.message || 'حدث خطأ أثناء التسجيل');
      }
    } catch (err) {
      setMessage('تعذر الاتصال بالخادم. حاول لاحقًا.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-red-600">تسجيل أدمن جديد</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-50 rounded-xl shadow p-8 flex flex-col gap-4">
        <input type="text" name="username" placeholder="اسم الأدمن" value={form.username} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="password" name="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="text" name="inviteCode" placeholder="كود الدعوة للأدمن" value={form.inviteCode} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded" disabled={loading}>{loading ? 'جاري التسجيل...' : 'تسجيل أدمن'}</button>
        {message && <div className="text-green-600 text-center mt-2">{message}</div>}
      </form>
      <div className="mt-6 text-center">
        <span className="text-gray-500">لست أدمن؟ </span>
        <a href="/register" className="text-blue-600 hover:underline font-bold">تسجيل مستخدم عادي</a>
      </div>
    </div>
  );
}

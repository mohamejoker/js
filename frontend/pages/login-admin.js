import React, { useState } from 'react';

export default function LoginAdmin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch('/api/login-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token); // تخزين التوكن
        setMessage('تم تسجيل الدخول بنجاح!');
        window.location.href = '/admin'; // توجيه للوحة الأدمن
      } else {
        setMessage(data.message || 'بيانات الدخول غير صحيحة');
      }
    } catch {
      setMessage('تعذر الاتصال بالخادم');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center py-20 px-4" dir="rtl">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">تسجيل دخول الأدمن</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-50 rounded-xl shadow p-8 flex flex-col gap-4">
        <input type="text" name="username" placeholder="اسم الأدمن" value={form.username} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <input type="password" name="password" placeholder="كلمة المرور" value={form.password} onChange={handleChange} className="p-3 rounded bg-white border border-gray-300 focus:outline-none" required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded" disabled={loading}>{loading ? 'جاري الدخول...' : 'دخول الأدمن'}</button>
        {message && <div className="text-red-600 text-center mt-2">{message}</div>}
      </form>
    </div>
  );
}

import React, { useState } from 'react';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('تمت إضافة المستخدم بنجاح');
      setName('');
      setEmail('');
    } else {
      setMessage(data.error || 'حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">إضافة مستخدم جديد</h2>
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold">إضافة</button>
        {message && <div className="mt-4 text-center text-green-400">{message}</div>}
      </form>
    </div>
  );
}

import React, { useState } from 'react';

export default function AddService() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('تمت إضافة الخدمة بنجاح');
      setTitle('');
      setDescription('');
    } else {
      setMessage(data.error || 'حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">إضافة خدمة جديدة</h2>
        <input
          type="text"
          placeholder="اسم الخدمة"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          required
        />
        <textarea
          placeholder="وصف الخدمة (اختياري)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-bold">إضافة</button>
        {message && <div className="mt-4 text-center text-green-400">{message}</div>}
      </form>
    </div>
  );
}

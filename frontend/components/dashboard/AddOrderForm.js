import React, { useState } from 'react';

export default function AddOrderForm({ users, services, onOrderAdded }) {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, service_id: serviceId, quantity })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('تمت إضافة الطلب بنجاح');
      setUserId('');
      setServiceId('');
      setQuantity('');
      onOrderAdded && onOrderAdded();
    } else {
      setMessage(data.error || 'حدث خطأ');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded mb-6">
      <h3 className="font-bold mb-2">إضافة طلب جديد</h3>
      <select value={userId} onChange={e => setUserId(e.target.value)} required className="mb-2 p-2 rounded w-full bg-gray-800">
        <option value="">اختر المستخدم</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
      <select value={serviceId} onChange={e => setServiceId(e.target.value)} required className="mb-2 p-2 rounded w-full bg-gray-800">
        <option value="">اختر الخدمة</option>
        {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
      </select>
      <input type="number" min="1" placeholder="الكمية" value={quantity} onChange={e => setQuantity(e.target.value)} required className="mb-2 p-2 rounded w-full bg-gray-800" />
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full font-bold">إضافة</button>
      {message && <div className="mt-2 text-green-400 text-center">{message}</div>}
    </form>
  );
}

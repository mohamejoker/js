import React, { useState, useEffect } from 'react';
import Alert from '../../alerts/Alert';
import Card from '../../ui/Card';

export default function OrdersTable({ orders }) {
  const [orderList, setOrderList] = useState(orders);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const handleStatusChange = async (id, status) => {
    setStatusMsg('');
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrderList(orderList.map(o => o.id === id ? { ...o, status } : o));
      setStatusMsg('تم تحديث حالة الطلب');
    } else {
      setStatusMsg('حدث خطأ أثناء التحديث');
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">الطلبات</h2>
      {statusMsg && <Alert type="success" message={statusMsg} />}
      <ul>
        {orderList.map(order => (
          <li key={order.id} className="mb-2 border-b border-gray-700 pb-2 flex flex-col md:flex-row md:items-center md:justify-between">
            <span className="font-bold text-blue-300">طلب #{order.id}</span>
            <span className="text-xs text-gray-400">{order.status}</span>
            <span className="text-gray-300">{order.user_name}</span>
            <span className="text-gray-300">{order.service_title}</span>
            <select
              value={order.status}
              onChange={e => handleStatusChange(order.id, e.target.value)}
              className="bg-gray-700 text-white rounded p-1 mt-2 md:mt-0 border border-blue-400"
            >
              <option value="pending">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </li>
        ))}
      </ul>
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import withAuth from '../utils/withAuth';

function Balance() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  const fetchBalance = async (userId) => {
    const res = await fetch(`/api/balance/${userId}`);
    const data = await res.json();
    setBalance(data.balance);
    const tRes = await fetch(`/api/transactions/${userId}`);
    setTransactions(await tRes.json());
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    if (e.target.value) fetchBalance(e.target.value);
    else {
      setBalance(null);
      setTransactions([]);
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: selectedUser, amount, type })
    });
    if (res.ok) {
      setMessage('تمت العملية بنجاح');
      setAmount('');
      fetchBalance(selectedUser);
    } else {
      setMessage('حدث خطأ');
    }
  };

  return (
    <DashboardLayout user={{ name: 'مشرف' }}>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">إدارة الرصيد والمعاملات</h1>
        <select value={selectedUser} onChange={handleUserChange} className="mb-4 p-2 rounded bg-gray-800">
          <option value="">اختر المستخدم</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        {selectedUser && (
          <>
            <div className="mb-4">الرصيد الحالي: <span className="font-bold text-green-400">{balance}</span></div>
            <form onSubmit={handleTransaction} className="bg-gray-700 p-4 rounded mb-6">
              <select value={type} onChange={e => setType(e.target.value)} className="mb-2 p-2 rounded w-full bg-gray-800">
                <option value="deposit">إيداع</option>
                <option value="withdraw">سحب</option>
              </select>
              <input type="number" min="1" placeholder="المبلغ" value={amount} onChange={e => setAmount(e.target.value)} required className="mb-2 p-2 rounded w-full bg-gray-800" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full font-bold">تنفيذ</button>
              {message && <div className="mt-2 text-green-400 text-center">{message}</div>}
            </form>
            <div className="bg-gray-800 rounded-xl p-6 shadow">
              <h2 className="text-2xl font-semibold mb-4">سجل المعاملات</h2>
              <ul>
                {transactions.map(t => (
                  <li key={t.id} className="mb-2 border-b border-gray-700 pb-2">
                    <span className="font-bold">{t.type === 'deposit' ? 'إيداع' : 'سحب'}</span> - {t.amount} - {t.created_at}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Balance);

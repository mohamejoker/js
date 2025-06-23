import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard');
    } else {
      setError(data.message || 'فشل تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل دخول الأدمن</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">دخول</button>
      </form>
    </div>
  );
}

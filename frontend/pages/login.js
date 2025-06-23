import React, { useState } from 'react';
import { login } from '../utils/authApi';
import { useRouter } from 'next/router';
import Alert from '../components/alerts/Alert';
import PageLayout from '../components/layout/PageLayout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err) {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <PageLayout>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-24 bg-gray-800 p-8 rounded-xl shadow flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">تسجيل الدخول</h2>
        {error && <Alert type="error" message={error} />}
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold">دخول</button>
      </form>
    </PageLayout>
  );
}

import React, { useState, useEffect } from 'react';

export default function AddDistributorApi() {
  const [apiUrl, setApiUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب الرابط الحالي عند تحميل الصفحة
    const fetchCurrentUrl = async () => {
      try {
        const res = await fetch('/api/get-distributor');
        const data = await res.json();
        if (res.ok && data.apiUrl) {
          setApiUrl(data.apiUrl);
        }
      } catch (err) {
        // تجاهل الخطأ في البداية
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/set-distributor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiUrl })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('تم حفظ رابط الموزع بنجاح!');
      setApiUrl('');
    } else {
      setMessage(data.error || 'حدث خطأ');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">إضافة أو تعديل رابط API للموزع</h2>
        {loading ? (
          <div className="mb-4 text-center text-gray-400">جاري التحميل...</div>
        ) : (
          <input
            type="url"
            placeholder="رابط API للموزع (مثال: https://api.example.com/services)"
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
            required
          />
        )}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold" disabled={loading}>
          {loading ? '...' : 'حفظ الرابط'}
        </button>
        {message && <div className="mt-4 text-center text-green-400">{message}</div>}
      </form>
    </div>
  );
}

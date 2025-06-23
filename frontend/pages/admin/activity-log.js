import React, { useEffect, useState } from 'react';
import Notification from '../../components/Notification';
import { apiFetch } from '../../utils/api';

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      try {
        // استبدل الرابط لاحقًا بـ /api/activity-log عند تفعيل الـbackend
        const res = await apiFetch('/api/activity-log');
        if (res.ok) {
          const data = await res.json();
          setLogs(data.logs || []);
        } else {
          setError('تعذر جلب سجل النشاطات');
        }
      } catch {
        setError('حدث خطأ أثناء الاتصال بالخادم');
      }
    }
    fetchLogs();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">سجل النشاطات</h1>
      {error && <Notification type="error" message={error} />}
      <div className="bg-white rounded shadow p-4">
        {logs.length === 0 ? (
          <p>لا يوجد نشاطات حتى الآن.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log, idx) => (
              <li key={idx} className="border-b pb-2 text-sm text-gray-700">
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

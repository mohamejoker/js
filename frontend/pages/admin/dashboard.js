import { useEffect } from 'react';
import { useRouter } from 'next/router';
import withAdminAuth from '../../components/withAdminAuth';

export default withAdminAuth(function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // يمكن جلب بيانات الأدمن أو الإحصائيات هنا لاحقًا
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">لوحة تحكم الأدمن</h1>
      <p className="mb-8">مرحبًا بك في لوحة التحكم. يمكنك إدارة النظام من هنا.</p>
      {/* زر تسجيل الخروج */}
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
});

import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/logout-admin`, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/login-admin');
  };
  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
      تسجيل الخروج
    </button>
  );
}

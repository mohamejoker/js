import { useEffect } from 'react';
import { useRouter } from 'next/router';

// هوك بسيط لإدارة حماية الأدمن
export default function useAdminAuth() {
  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);
}

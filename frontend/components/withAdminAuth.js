import { useEffect } from 'react';
import { useRouter } from 'next/router';

// HOC لحماية صفحات الأدمن بناءً على وجود التوكن
const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    useEffect(() => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      if (!token) {
        router.replace('/admin/login');
      }
    }, [router]);
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

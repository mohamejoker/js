import { useEffect } from 'react';
import { logout } from '../utils/authApi';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push('/login');
  }, []);
  return null;
}

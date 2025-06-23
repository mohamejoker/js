import { getAuthToken } from '../utils/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function Authenticated(props) {
    const router = useRouter();
    useEffect(() => {
      if (!getAuthToken()) router.push('/login');
    }, []);
    return <Component {...props} />;
  };
}

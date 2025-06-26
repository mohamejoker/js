import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { ToastProvider } from '../components/common/Toast';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // تحسين الأداء على الأجهزة المحمولة
    const handleRouteChange = () => {
      // إخفاء شريط العنوان على Safari Mobile
      if (typeof window !== 'undefined' && window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    // تحسين الأداء بمنع التمرير المطاطي على iOS
    const preventBounce = (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventBounce, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventBounce);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Component {...pageProps} />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;

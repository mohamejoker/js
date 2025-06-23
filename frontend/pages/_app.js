import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    // Set document direction based on locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
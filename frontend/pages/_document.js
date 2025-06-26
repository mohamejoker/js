import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Town Media Agent" />
        <meta name="publisher" content="Town Media Agent" />
        <meta name="copyright" content="Town Media Agent" />

        {/* Mobile Optimization */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Town Media" />
        <meta name="application-name" content="Town Media" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Town Media Agent" />
        <meta property="og:locale" content="ar_EG" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@townmedia" />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />

        {/* Critical CSS for above-the-fold content */}
        <style jsx>{`
          /* Critical CSS for faster initial load */
          body {
            font-family:
              'Cairo',
              -apple-system,
              BlinkMacSystemFont,
              'Segoe UI',
              Roboto,
              sans-serif;
            direction: rtl;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          * {
            box-sizing: border-box;
          }

          /* Prevent flash of unstyled content */
          .loading-placeholder {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          /* Initial loading animation */
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }

          /* Prevent horizontal scroll on mobile */
          html,
          body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }

          /* iOS Safari specific fixes */
          @supports (-webkit-touch-callout: none) {
            body {
              -webkit-overflow-scrolling: touch;
            }
          }
        `}</style>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Town Media Agent',
              description: 'وكالة التسويق الرقمي الرائدة في الشرق الأوسط',
              url: 'https://townmedia.com',
              logo: 'https://townmedia.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+20-100-123-4567',
                contactType: 'customer service',
                availableLanguage: ['Arabic', 'English'],
              },
              sameAs: [
                'https://facebook.com/townmedia',
                'https://instagram.com/townmedia',
                'https://twitter.com/townmedia',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG',
                addressLocality: 'Cairo',
              },
            }),
          }}
        />

        {/* Performance monitoring */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics or other analytics */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // Performance monitoring
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      const perfData = performance.getEntriesByType('navigation')[0];
                      if (perfData && perfData.loadEventEnd > 0) {
                        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                      }
                    }, 0);
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      <body className="antialiased">
        {/* No-script fallback */}
        <noscript>
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <h2>JavaScript مطلوب</h2>
            <p>يرجى تفعيل JavaScript في متصفحك لاستخدام هذا الموقع.</p>
          </div>
        </noscript>

        {/* Loading placeholder */}
        <div id="loading-placeholder" className="loading-placeholder" style={{ display: 'none' }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(255,255,255,0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px',
              }}
            ></div>
            <h2>Town Media Agent</h2>
            <p>جاري التحميل...</p>
          </div>
        </div>

        <Main />
        <NextScript />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />

        {/* Spinning animation for loading */}
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </body>
    </Html>
  );
}

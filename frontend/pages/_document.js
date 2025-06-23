import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical loading styles */
            body {
              margin: 0;
              font-family: 'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif;
              background: #0f172a;
              color: #ffffff;
              overflow-x: hidden;
            }
            
            /* Loading animation */
            .loading-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }
            
            .loader {
              width: 50px;
              height: 50px;
              border: 3px solid rgba(59, 130, 246, 0.3);
              border-left-color: #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            
            /* Hide loading when ready */
            .loaded .loading-container {
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.5s ease-out;
            }
          `
        }} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Meta tags */}
        <meta name="author" content="Town Media Agent AI" />
        <meta name="robots" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Town Media Agent AI" />
        
        {/* Twitter Card defaults */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@townmediaai" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Town Media Agent AI",
              "description": "وكيل ذكي بالذكاء الاصطناعي لنمو وسائل التواصل الاجتماعي",
              "url": "https://townmediaagent.ai",
              "logo": "https://townmediaagent.ai/logo.png",
              "sameAs": [
                "https://instagram.com/townmediaagent",
                "https://twitter.com/townmediaagent",
                "https://youtube.com/townmediaagent",
                "https://telegram.me/townmediaagent"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-TOWN-AI",
                "contactType": "Customer Service",
                "availableLanguage": ["Arabic", "English"]
              },
              "areaServed": "Worldwide",
              "serviceType": "Social Media Marketing"
            })
          }}
        />
      </Head>
      <body>
        {/* Loading Screen */}
        <div className="loading-container">
          <div className="loader"></div>
        </div>
        
        <Main />
        <NextScript />
        
        {/* Page Load Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  document.body.classList.add('loaded');
                  setTimeout(function() {
                    const loader = document.querySelector('.loading-container');
                    if (loader) loader.remove();
                  }, 500);
                }, 1000);
              });
            `
          }}
        />
      </body>
    </Html>
  );
}
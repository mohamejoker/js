/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Enable SWC minification for better performance
  swcMinify: true,

  // Enable experimental features
  experimental: {
    // Enable modern bundling for better performance
    modernBundling: true,

    // Enable optimized images
    optimizeCss: true,

    // Enable server components
    serverComponentsExternalPackages: [],
  },

  // Image optimization configuration
  images: {
    // Optimize images for mobile devices
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Image formats
    formats: ['image/webp', 'image/avif'],

    // Quality settings
    quality: 80,

    // Enable placeholder blur for better UX
    placeholder: 'blur',

    // Allowed domains for external images
    domains: [
      'localhost',
      'townmedia.com',
      'cdn.townmedia.com',
      'images.unsplash.com',
      'via.placeholder.com',
    ],

    // Remote patterns for security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Internationalization
  i18n,

  // Custom headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      // Cache static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      // Cache icons
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800',
          },
        ],
      },
      // PWA files
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },

  // Custom rewrites for API proxy
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },

  // Custom redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/login',
        permanent: false,
      },
      {
        source: '/panel',
        destination: '/admin',
        permanent: true,
      },
    ];
  },

  // Webpack configuration for optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    };

    // Add webpack plugins for better mobile performance
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        __SERVER__: isServer,
        __BROWSER__: !isServer,
      })
    );

    // Optimize for mobile devices
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Environment variables available to the browser
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:8000',
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },

  // Enable compression
  compress: true,

  // Generate ETags for better caching
  generateEtags: true,

  // Power-up mode for better performance
  poweredByHeader: false,

  // Output configuration
  output: 'standalone',

  // Compiler options
  compiler: {
    // Enable styled-components if used
    styledComponents: false,

    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable eslint during builds
  eslint: {
    dirs: ['pages', 'components', 'utils', 'hooks'],
    ignoreDuringBuilds: false,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Custom page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Trailing slash configuration
  trailingSlash: false,

  // Base path if app is served from subdirectory
  basePath: process.env.BASE_PATH || '',

  // Asset prefix for CDN
  assetPrefix: process.env.ASSET_PREFIX || '',

  // Custom server configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    apiUrl: process.env.API_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;

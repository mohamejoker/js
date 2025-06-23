module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    localeDetection: false, // تصحيح القيمة لتكون false بدلاً من true
  },
  fallbackLng: {
    default: ['ar'],
    en: ['en'],
  },
  nonExplicitSupportedLngs: true,
  cleanCode: true,
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
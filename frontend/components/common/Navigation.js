import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuthToken, removeAuthToken } from '../../utils/auth';

const Navigation = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);

    // مراقبة التمرير لتغيير شكل الشريط
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    router.push('/landing');
  };

  const menuItems = [
    { name: 'الرئيسية', href: '/', auth: false },
    { name: 'الخدمات', href: '/services', auth: false },
    { name: 'لوحة التحكم', href: '/dashboard', auth: true },
    { name: 'التقارير', href: '/reports', auth: true },
    { name: 'الأدمن', href: '/admin', auth: 'admin' },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.auth === false) return true;
    if (item.auth === true && isAuthenticated) return true;
    if (item.auth === 'admin' && isAuthenticated) return true; // يمكن تحسين هذا لاحقاً
    return false;
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Town Media
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`text-white hover:text-blue-400 transition-colors font-medium ${
                    router.pathname === item.href ? 'text-blue-400' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {isAuthenticated ? (
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  تسجيل الخروج
                </motion.button>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-white hover:text-blue-400 transition-colors"
                    >
                      دخول
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      تسجيل
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
              />
              <motion.span
                className={`w-6 h-0.5 bg-white block mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              />
              <motion.span
                className={`w-6 h-0.5 bg-white block mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4 bg-gray-800/95 backdrop-blur-md rounded-lg mt-2">
                {filteredMenuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-white hover:text-blue-400 transition-colors ${
                        router.pathname === item.href ? 'text-blue-400 bg-blue-900/30' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="px-4 py-2 space-y-2">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      تسجيل الخروج
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block w-full px-4 py-2 text-center text-white hover:text-blue-400 transition-colors border border-white/20 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        دخول
                      </Link>
                      <Link
                        href="/register"
                        className="block w-full px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        تسجيل
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;

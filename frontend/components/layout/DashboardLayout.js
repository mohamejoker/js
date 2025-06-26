import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuthToken, removeAuthToken } from '../../utils/auth';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    // يمكن جلب بيانات المستخدم هنا
    setUser({ name: 'المستخدم', role: 'user' });
  }, [router]);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/landing');
  };

  const menuItems = [
    { name: 'لوحة التحكم', href: '/dashboard', icon: '🏠' },
    { name: 'الطلبات', href: '/manage-orders', icon: '📋' },
    { name: 'الخدمات', href: '/manage-services', icon: '⚙️' },
    { name: 'المستخدمين', href: '/manage-users', icon: '👥' },
    { name: 'التقارير', href: '/reports', icon: '📊' },
    { name: 'الرصيد', href: '/balance', icon: '💰' },
    { name: 'الإعدادات', href: '/admin-editor', icon: '🔧' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-lg">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <Link href="/" className="text-white text-xl font-bold">
              Town Media
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  router.pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <span className="text-lg ml-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="mr-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || 'المستخدم'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.role === 'admin' ? 'مدير' : 'مستخدم'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex-shrink-0 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                title="تسجيل الخروج"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <Link href="/" className="text-white text-xl font-bold">
                  Town Media
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 px-2 py-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      router.pathname === item.href
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg ml-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:pr-64">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="text-xl">☰</span>
                </button>
                <h1 className="mr-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {menuItems.find((item) => item.href === router.pathname)?.name || 'لوحة التحكم'}
                </h1>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  🔔
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  🌙
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

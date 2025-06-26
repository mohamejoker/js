import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: 'JokeR', role: 'Super Admin' });
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    {
      section: 'الرئيسية',
      items: [
        { name: 'لوحة التحكم', href: '/admin', icon: '🏠' },
        { name: 'الإحصائيات', href: '/admin/analytics', icon: '📊' },
      ],
    },
    {
      section: 'إدارة المحتوى',
      items: [
        { name: 'الخدمات', href: '/admin/services', icon: '⚙️' },
        { name: 'الطلبات', href: '/admin/orders', icon: '📋' },
        { name: 'المستخدمين', href: '/admin/users', icon: '👥' },
        { name: 'الموزعين', href: '/admin/resellers', icon: '🤝' },
      ],
    },
    {
      section: 'المالية',
      items: [
        { name: 'طرق الدفع', href: '/admin/payments', icon: '💳' },
        { name: 'المعاملات', href: '/admin/transactions', icon: '💰' },
        { name: 'الفواتير', href: '/admin/invoices', icon: '🧾' },
        { name: 'التقارير المالية', href: '/admin/financial-reports', icon: '📈' },
      ],
    },
    {
      section: 'الإعدادات',
      items: [
        { name: 'إعدادات الموقع', href: '/admin/site-settings', icon: '🔧' },
        { name: 'إعدادات API', href: '/admin/api-settings', icon: '🔌' },
        { name: 'النسخ الاحتياطي', href: '/admin/backup', icon: '💾' },
        { name: 'الأمان', href: '/admin/security', icon: '🔒' },
      ],
    },
    {
      section: 'الأدوات',
      items: [
        { name: 'مراقب النظام', href: '/admin/system-monitor', icon: '📡' },
        { name: 'سجل الأنشطة', href: '/admin/activity-log', icon: '📝' },
        { name: 'إدارة الملفات', href: '/admin/file-manager', icon: '📁' },
        { name: 'قاعدة البيانات', href: '/admin/database', icon: '🗄️' },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/admin" className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Town Media Admin
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لوحة التحكم الشاملة</p>
                </div>
              </Link>
            </div>

            {/* Center Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="البحث في لوحة التحكم..."
                  className="w-full px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <motion.button
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">🔔</span>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </motion.button>

                <motion.button
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">📧</span>
                </motion.button>

                <motion.button
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xl">🌙</span>
                </motion.button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  خروج
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 dark:text-gray-400"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 md:pt-20">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-6">
              {menuItems.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    {section.section}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          router.pathname === item.href
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="text-lg ml-3">{item.icon}</span>
                        {item.name}
                        {item.badge && (
                          <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h4 className="font-medium mb-1">نسخة Pro</h4>
                <p className="text-xs opacity-90">جميع الميزات المتقدمة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                className="md:hidden fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl"
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    القائمة الرئيسية
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                  {menuItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        {section.section}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              router.pathname === item.href
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <span className="text-lg ml-3">{item.icon}</span>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="md:pr-80 flex-1">
          <main className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

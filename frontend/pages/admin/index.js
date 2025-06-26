import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalServices: 0,
    totalRevenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    activeServices: 0,
    totalResellers: 0,
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'تم إضافة خدمة جديدة بنجاح', time: 'منذ 5 دقائق' },
    { id: 2, type: 'warning', message: 'طلب جديد يحتاج مراجعة', time: 'منذ 10 دقائق' },
    { id: 3, type: 'info', message: 'تسجيل مستخدم جديد', time: 'منذ 15 دقيقة' },
  ]);

  useEffect(() => {
    checkAdminAuth();
    fetchDashboardStats();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        const response = await fetch('http://localhost:4000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:4000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalUsers: data.stats?.users || 0,
          totalOrders: data.stats?.orders || 0,
          totalServices: data.stats?.services || 0,
          totalRevenue: data.stats?.balance || 0,
          todayOrders: Math.floor(Math.random() * 50) + 10,
          pendingOrders: Math.floor(Math.random() * 20) + 5,
          activeServices: data.stats?.services || 0,
          totalResellers: Math.floor(Math.random() * 10) + 3,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const statCards = [
    {
      title: 'إجمالي المستخدمين',
      value: stats.totalUsers,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: '📋',
      color: 'from-green-500 to-green-600',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'إجمالي الإيرادات',
      value: `${stats.totalRevenue.toLocaleString()} ج.م`,
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
      change: '+15%',
      changeType: 'positive',
    },
    {
      title: 'الخدمات النشطة',
      value: stats.activeServices,
      icon: '⚙️',
      color: 'from-purple-500 to-purple-600',
      change: '+3%',
      changeType: 'positive',
    },
    {
      title: 'طلبات اليوم',
      value: stats.todayOrders,
      icon: '📈',
      color: 'from-indigo-500 to-indigo-600',
      change: '+25%',
      changeType: 'positive',
    },
    {
      title: 'طلبات معلقة',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'from-orange-500 to-orange-600',
      change: '-5%',
      changeType: 'negative',
    },
    {
      title: 'إجمالي الموزعين',
      value: stats.totalResellers,
      icon: '🤝',
      color: 'from-teal-500 to-teal-600',
      change: '+20%',
      changeType: 'positive',
    },
    {
      title: 'معدل النجاح',
      value: '98.5%',
      icon: '✅',
      color: 'from-emerald-500 to-emerald-600',
      change: '+2%',
      changeType: 'positive',
    },
  ];

  const quickActions = [
    {
      title: 'إضافة خدمة جديدة',
      description: 'أضف خدمة جديدة للمنصة',
      icon: '➕',
      color: 'bg-blue-500',
      action: () => router.push('/admin/services/add'),
    },
    {
      title: 'إدارة الطلبات',
      description: 'عرض ومراجعة الطلبات',
      icon: '📋',
      color: 'bg-green-500',
      action: () => router.push('/admin/orders'),
    },
    {
      title: 'إضافة موزع',
      description: 'إضافة موزع جديد',
      icon: '🤝',
      color: 'bg-purple-500',
      action: () => router.push('/admin/resellers/add'),
    },
    {
      title: 'إعدادات الدفع',
      description: 'تكوين طرق الدفع',
      icon: '💳',
      color: 'bg-yellow-500',
      action: () => router.push('/admin/payments'),
    },
    {
      title: 'تقارير مفصلة',
      description: 'عرض التقارير والإحصائيات',
      icon: '📊',
      color: 'bg-indigo-500',
      action: () => router.push('/admin/reports'),
    },
    {
      title: 'إعدادات الموقع',
      description: 'تخصيص إعدادات المنصة',
      icon: '🔧',
      color: 'bg-gray-500',
      action: () => router.push('/admin/settings'),
    },
  ];

  return (
    <>
      <Head>
        <title>لوحة التحكم الرئيسية - Admin Panel</title>
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                مرحباً بك في لوحة التحكم 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                إدارة شاملة لمنصة Town Media Agent
              </p>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchDashboardStats()}
              >
                🔄 تحديث البيانات
              </motion.button>
              <div className="relative">
                <motion.button
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg relative"
                  whileHover={{ scale: 1.05 }}
                >
                  🔔
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div
                    className={`text-sm px-2 py-1 rounded-full ${
                      stat.changeType === 'positive'
                        ? 'bg-white/20 text-white'
                        : 'bg-red-500/20 text-red-100'
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.title}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  الإجراءات السريعة
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}
                      >
                        {action.icon}
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  الإشعارات الأخيرة
                </h3>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        notification.type === 'success'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : notification.type === 'warning'
                            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  عرض جميع الإشعارات
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              النشاط الأخير
            </h3>
            <div className="space-y-4">
              {[
                {
                  action: 'تم إنشاء طلب جديد #1234',
                  user: 'أحمد محمد',
                  time: 'منذ دقيقتين',
                  type: 'order',
                },
                {
                  action: 'تم تسجيل مستخدم جديد',
                  user: 'سارة أحمد',
                  time: 'منذ 5 دقائق',
                  type: 'user',
                },
                {
                  action: 'تم تحديث خدمة Instagram',
                  user: 'Admin',
                  time: 'منذ 10 دقائق',
                  type: 'service',
                },
                {
                  action: 'تم إكمال طلب #1230',
                  user: 'خالد العلي',
                  time: 'منذ 15 دقيقة',
                  type: 'completed',
                },
                {
                  action: 'تم إضافة موزع جديد',
                  user: 'Admin',
                  time: 'منذ 20 دقيقة',
                  type: 'reseller',
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                        activity.type === 'order'
                          ? 'bg-blue-500'
                          : activity.type === 'user'
                            ? 'bg-green-500'
                            : activity.type === 'service'
                              ? 'bg-purple-500'
                              : activity.type === 'completed'
                                ? 'bg-emerald-500'
                                : 'bg-orange-500'
                      }`}
                    >
                      {activity.type === 'order'
                        ? '📋'
                        : activity.type === 'user'
                          ? '👤'
                          : activity.type === 'service'
                            ? '⚙️'
                            : activity.type === 'completed'
                              ? '✅'
                              : '🤝'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        بواسطة {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AdminLayout>
    </>
  );
}

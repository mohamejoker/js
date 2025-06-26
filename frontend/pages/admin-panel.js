import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    services: 0,
    balance: 0,
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // التحقق من صحة التوكن
        const response = await fetch('http://localhost:4000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          const data = await response.json();
          setStats(data.stats);
        } else {
          localStorage.removeItem('adminToken');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setStats(data.stats || stats);
      } else {
        alert(data.message || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/api/admin/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // صفحة تسجيل الدخول
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Panel - Town Media Agent</title>
        </Head>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <motion.div
            className="max-w-md w-full space-y-8 p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">Admin Panel</h2>
              <p className="text-blue-200">Town Media Agent</p>
            </div>

            <motion.form
              onSubmit={handleLogin}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <label className="block text-white text-sm font-medium mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="JokeR"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">كلمة المرور</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </motion.button>

              <div className="text-center text-sm text-blue-200">
                <p>
                  المستخدم الافتراضي: <strong>JokeR</strong>
                </p>
                <p>
                  كلمة المرور: <strong>Jokermedo**1122</strong>
                </p>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </>
    );
  }

  // لوحة التحكم الرئيسية
  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: '📊' },
    { id: 'orders', name: 'الطلبات', icon: '📋' },
    { id: 'services', name: 'الخدمات', icon: '⚙️' },
    { id: 'users', name: 'المستخدمين', icon: '👥' },
    { id: 'reports', name: 'التقارير', icon: '📈' },
    { id: 'settings', name: 'الإعدادات', icon: '🔧' },
  ];

  return (
    <>
      <Head>
        <title>Admin Panel - SMM Panel Management</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
        {/* Top Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🚀 Town Media Admin
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  SMM Panel
                </span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  مرحباً، <strong>JokeR</strong>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  خروج 🚪
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen sticky top-0">
            <div className="p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-right transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {activeTab === 'dashboard' && <DashboardContent stats={stats} />}
            {activeTab === 'orders' && <OrdersContent />}
            {activeTab === 'services' && <ServicesContent />}
            {activeTab === 'users' && <UsersContent />}
            {activeTab === 'reports' && <ReportsContent />}
            {activeTab === 'settings' && <SettingsContent />}
          </div>
        </div>
      </div>
    </>
  );
}

// مكونات المحتوى
const DashboardContent = ({ stats }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة التحكم الرئيسية</h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'إجمالي المستخدمين', value: stats.users, icon: '👥', color: 'blue' },
        { label: 'إجمالي الطلبات', value: stats.orders, icon: '📋', color: 'green' },
        { label: 'إجمالي الخدمات', value: stats.services, icon: '⚙️', color: 'purple' },
        { label: 'إجمالي الرصيد', value: `${stats.balance} ج.م`, icon: '💰', color: 'yellow' },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className={`bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-xl p-6 text-white shadow-lg`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-3xl opacity-80">{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Quick Actions */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        الإجراءات السريعة
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'إضافة خدمة', icon: '➕', action: () => console.log('Add service') },
          { name: 'عرض الطلبات', icon: '👁️', action: () => console.log('View orders') },
          { name: 'إدارة المستخدمين', icon: '👤', action: () => console.log('Manage users') },
          { name: 'تصدير التقارير', icon: '📥', action: () => console.log('Export reports') },
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</div>
          </button>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">النشاط الأخير</h3>
      <div className="space-y-3">
        {[
          { action: 'طلب جديد تم إنشاؤه', time: 'منذ دقيق��ين', user: 'أحمد محمد' },
          { action: 'تم تسجيل مستخدم جديد', time: 'منذ 5 دقائق', user: 'سارة أحمد' },
          { action: 'تم إكمال طلب', time: 'منذ 10 دقائق', user: 'خالد العلي' },
        ].map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">بواسطة {activity.user}</p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const OrdersContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الطلبات</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <p className="text-gray-600 dark:text-gray-400">قائمة الطلبات ستظهر هنا...</p>
    </div>
  </div>
);

const ServicesContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الخدمات</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <p className="text-gray-600 dark:text-gray-400">قائمة الخدمات ستظهر هنا...</p>
    </div>
  </div>
);

const UsersContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المستخدمين</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <p className="text-gray-600 dark:text-gray-400">قائمة المستخدمين ستظهر هنا...</p>
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">التقارير والإحصائيات</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <p className="text-gray-600 dark:text-gray-400">التقارير ستظهر هنا...</p>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">إعدادات النظام</h2>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <p className="text-gray-600 dark:text-gray-400">إعدادات النظام ستظهر هنا...</p>
    </div>
  </div>
);

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsSection from '../components/ui/StatsSection';
import OrdersTable from '../components/dashboard/OrdersTable';
import { getAuthToken } from '../utils/auth';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState([
    { label: 'عدد المستخدمين', value: 0 },
    { label: 'عدد الطلبات', value: 0 },
    { label: 'عدد الخدمات', value: 0 },
    { label: 'إجمالي الرصيد', value: 0 },
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التحقق من المصادقة
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    // جلب البيانات
    const fetchData = async () => {
      try {
        setLoading(true);

        // جلب الإحصائيات
        const statsResponse = await fetch('/api/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // جلب الطلبات
        const ordersResponse = await fetch('/api/orders');
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Head>
        <title>لوحة التحكم - Town Media Agent</title>
        <meta name="description" content="لوحة التحكم الرئيسية لإدارة الخدمات والطلبات" />
      </Head>

      <DashboardLayout>
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h1>
            <p className="text-blue-100">إدارة شاملة لجميع الخدمات والطلبات</p>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants}>
            <StatsSection stats={stats} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="grid md:grid-cols-3 gap-6" variants={itemVariants}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">طلب جديد</h3>
                  <p className="text-gray-600 dark:text-gray-300">إنشاء طلب خدمة جديد</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                إضافة طلب
              </button>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    إدارة الخدمات
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">عرض وتحرير الخدمات</p>
                </div>
                <div className="text-3xl">⚙️</div>
              </div>
              <button
                onClick={() => router.push('/manage-services')}
                className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                إدارة الخدمات
              </button>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">التقارير</h3>
                  <p className="text-gray-600 dark:text-gray-300">عرض التقارير والإحصائيات</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
              <button
                onClick={() => router.push('/reports')}
                className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                عرض التقارير
              </button>
            </motion.div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                الطلبات الأخيرة
              </h2>
            </div>
            <OrdersTable orders={orders.slice(0, 10)} />
          </motion.div>
        </motion.div>
      </DashboardLayout>
    </>
  );
}

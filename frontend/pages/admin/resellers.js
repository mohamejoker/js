import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminResellers() {
  const [resellers, setResellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newReseller, setNewReseller] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    discountRate: 10,
    status: 'active',
    apiKey: '',
    allowedServices: [],
    dailyLimit: 100000,
    monthlyLimit: 1000000,
    minBalance: 0,
    paymentMethod: 'manual',
    notes: '',
  });

  // بيانات تجريبية للموزعين
  useEffect(() => {
    setTimeout(() => {
      setResellers([
        {
          id: 1,
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+20123456789',
          company: 'Digital Marketing Pro',
          website: 'https://example.com',
          discountRate: 15,
          status: 'active',
          apiKey: 'api_key_123456',
          totalOrders: 150,
          totalRevenue: 75000,
          lastActivity: '2024-01-15',
          joinDate: '2023-06-01',
          dailyLimit: 50000,
          monthlyLimit: 500000,
          currentBalance: 25000,
          minBalance: 1000,
        },
        {
          id: 2,
          name: 'سارة أحمد',
          email: 'sara@example.com',
          phone: '+20987654321',
          company: 'Social Media Solutions',
          website: 'https://sms.com',
          discountRate: 20,
          status: 'active',
          apiKey: 'api_key_789012',
          totalOrders: 320,
          totalRevenue: 180000,
          lastActivity: '2024-01-14',
          joinDate: '2023-03-15',
          dailyLimit: 100000,
          monthlyLimit: 1000000,
          currentBalance: 50000,
          minBalance: 5000,
        },
        {
          id: 3,
          name: 'خالد العلي',
          email: 'khalid@example.com',
          phone: '+20555666777',
          company: 'Growth Agency',
          website: 'https://growth.com',
          discountRate: 12,
          status: 'suspended',
          apiKey: 'api_key_345678',
          totalOrders: 80,
          totalRevenue: 35000,
          lastActivity: '2024-01-10',
          joinDate: '2023-08-20',
          dailyLimit: 25000,
          monthlyLimit: 250000,
          currentBalance: 5000,
          minBalance: 2000,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddReseller = async (e) => {
    e.preventDefault();
    const apiKey = 'api_key_' + Math.random().toString(36).substr(2, 9);
    const newId = Math.max(...resellers.map((r) => r.id), 0) + 1;

    const resellerData = {
      id: newId,
      ...newReseller,
      apiKey,
      totalOrders: 0,
      totalRevenue: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
      currentBalance: 0,
    };

    setResellers([...resellers, resellerData]);
    setShowAddModal(false);
    setNewReseller({
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      discountRate: 10,
      status: 'active',
      apiKey: '',
      allowedServices: [],
      dailyLimit: 100000,
      monthlyLimit: 1000000,
      minBalance: 0,
      paymentMethod: 'manual',
      notes: '',
    });
  };

  const handleDeleteReseller = (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الموزع؟')) {
      setResellers(resellers.filter((r) => r.id !== id));
    }
  };

  const handleEditReseller = (reseller) => {
    setSelectedReseller(reseller);
    setShowEditModal(true);
  };

  const generateApiKey = () => {
    const newApiKey = 'api_key_' + Math.random().toString(36).substr(2, 9);
    setNewReseller({ ...newReseller, apiKey: newApiKey });
  };

  const filteredResellers = resellers.filter((reseller) => {
    const matchesSearch =
      reseller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reseller.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalResellers: resellers.length,
    activeResellers: resellers.filter((r) => r.status === 'active').length,
    suspendedResellers: resellers.filter((r) => r.status === 'suspended').length,
    totalRevenue: resellers.reduce((sum, r) => sum + r.totalRevenue, 0),
  };

  return (
    <>
      <Head>
        <title>إدارة الموزعين - Admin Panel</title>
      </Head>

      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الموزعين</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                إدارة شاملة لجميع الموزعين والشركاء
              </p>
            </div>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🤝 إضافة موزع جديد
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              {
                label: 'إجمالي الموزعين',
                value: totalStats.totalResellers,
                icon: '🤝',
                color: 'from-blue-500 to-blue-600',
              },
              {
                label: 'الموزعين النشطين',
                value: totalStats.activeResellers,
                icon: '✅',
                color: 'from-green-500 to-green-600',
              },
              {
                label: 'الموزعين المعلقين',
                value: totalStats.suspendedResellers,
                icon: '⏸️',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                label: 'إجمالي الإيرادات',
                value: `${totalStats.totalRevenue.toLocaleString()} ج.م`,
                icon: '💰',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
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
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="البحث في الموزعين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="suspended">معلق</option>
                <option value="pending">في الانتظار</option>
              </select>
            </div>
          </motion.div>

          {/* Resellers Table */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        معلومات الموزع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الشركة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الخصم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الطلبات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الإيرادات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredResellers.map((reseller, index) => (
                      <motion.tr
                        key={reseller.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {reseller.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {reseller.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {reseller.email}
                              </div>
                              <div className="text-xs text-gray-400">{reseller.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {reseller.company}
                          </div>
                          {reseller.website && (
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {reseller.website}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            {reseller.discountRate}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {reseller.totalOrders}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {reseller.totalRevenue.toLocaleString()} ج.م
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reseller.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : reseller.status === 'suspended'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            }`}
                          >
                            {reseller.status === 'active'
                              ? '✅ نشط'
                              : reseller.status === 'suspended'
                                ? '⏸️ معلق'
                                : '⏳ في الانتظار'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <motion.button
                              onClick={() => handleEditReseller(reseller)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="تعديل"
                            >
                              ✏️
                            </motion.button>
                            <motion.button
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="عرض التقارير"
                            >
                              📊
                            </motion.button>
                            <motion.button
                              className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="API Key"
                            >
                              🔑
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteReseller(reseller.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="حذف"
                            >
                              🗑️
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Add Reseller Modal */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        إضافة موزع جديد
                      </h3>
                      <button
                        onClick={() => setShowAddModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddReseller} className="space-y-6">
                      {/* معلومات شخصية */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          الم��لومات الشخصية
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              الاسم الكامل *
                            </label>
                            <input
                              type="text"
                              required
                              value={newReseller.name}
                              onChange={(e) =>
                                setNewReseller({ ...newReseller, name: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              البريد الإلكتروني *
                            </label>
                            <input
                              type="email"
                              required
                              value={newReseller.email}
                              onChange={(e) =>
                                setNewReseller({ ...newReseller, email: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              رقم الهاتف
                            </label>
                            <input
                              type="tel"
                              value={newReseller.phone}
                              onChange={(e) =>
                                setNewReseller({ ...newReseller, phone: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              اسم الشركة
                            </label>
                            <input
                              type="text"
                              value={newReseller.company}
                              onChange={(e) =>
                                setNewReseller({ ...newReseller, company: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* إعدادات العمل */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          إعدادات العمل
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              نسبة الخصم (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              value={newReseller.discountRate}
                              onChange={(e) =>
                                setNewReseller({
                                  ...newReseller,
                                  discountRate: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              الحد اليومي
                            </label>
                            <input
                              type="number"
                              value={newReseller.dailyLimit}
                              onChange={(e) =>
                                setNewReseller({
                                  ...newReseller,
                                  dailyLimit: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              الحد الشهري
                            </label>
                            <input
                              type="number"
                              value={newReseller.monthlyLimit}
                              onChange={(e) =>
                                setNewReseller({
                                  ...newReseller,
                                  monthlyLimit: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* API Key */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          إعدادات API
                        </h4>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              API Key
                            </label>
                            <input
                              type="text"
                              value={newReseller.apiKey}
                              readOnly
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="flex items-end">
                            <motion.button
                              type="button"
                              onClick={generateApiKey}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              🔑 إنشاء مفتاح
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="submit"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          إضافة الموزع
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setShowAddModal(false)}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          إلغاء
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AdminLayout>
    </>
  );
}

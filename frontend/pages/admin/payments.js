import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminPayments() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('methods');
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: 'فودافون كاش',
      type: 'mobile_wallet',
      provider: 'Vodafone',
      credentials: {
        merchantCode: 'VFCASH_12345',
        apiKey: 'vf_api_key_123',
        secretKey: 'vf_secret_key_456',
      },
      status: 'active',
      fees: 2.5,
      minAmount: 10,
      maxAmount: 5000,
      currency: 'EGP',
      icon: '📱',
      description: 'دفع عبر فودافون كاش',
    },
    {
      id: 2,
      name: 'بطاقات الائتمان',
      type: 'credit_card',
      provider: 'Paymob',
      credentials: {
        apiKey: 'paymob_api_key_789',
        secretKey: 'paymob_secret_012',
        integrationId: 'integration_345',
      },
      status: 'active',
      fees: 3.0,
      minAmount: 20,
      maxAmount: 10000,
      currency: 'EGP',
      icon: '💳',
      description: 'فيزا وماستركارد',
    },
    {
      id: 3,
      name: 'إنستاباي',
      type: 'digital_wallet',
      provider: 'InstaPay',
      credentials: {
        merchantId: 'INST_MERCHANT_456',
        apiKey: 'inst_api_key_789',
      },
      status: 'active',
      fees: 1.5,
      minAmount: 5,
      maxAmount: 3000,
      currency: 'EGP',
      icon: '⚡',
      description: 'محفظة إنستاباي الرقمية',
    },
    {
      id: 4,
      name: 'تحويل بنكي',
      type: 'bank_transfer',
      provider: 'Manual',
      credentials: {
        bankName: 'البنك الأهلي المصري',
        accountNumber: '1234567890123456',
        accountName: 'Town Media Agent',
      },
      status: 'active',
      fees: 0,
      minAmount: 100,
      maxAmount: 50000,
      currency: 'EGP',
      icon: '🏦',
      description: 'تحويل بنكي مباشر',
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      userId: 1,
      userName: 'أحمد محمد',
      method: 'فودافون كاش',
      amount: 500,
      fees: 12.5,
      netAmount: 487.5,
      status: 'completed',
      type: 'deposit',
      date: '2024-01-15 14:30:00',
      reference: 'VF123456789',
      notes: 'تم بنجاح',
    },
    {
      id: 'TXN002',
      userId: 2,
      userName: 'سارة أحمد',
      method: 'بطاقات الائتمان',
      amount: 1000,
      fees: 30,
      netAmount: 970,
      status: 'pending',
      type: 'deposit',
      date: '2024-01-15 15:45:00',
      reference: 'CC987654321',
      notes: 'في انتظار التأكيد',
    },
    {
      id: 'TXN003',
      userId: 3,
      userName: 'خالد العلي',
      method: 'إنستاباي',
      amount: 250,
      fees: 3.75,
      netAmount: 246.25,
      status: 'failed',
      type: 'deposit',
      date: '2024-01-15 16:20:00',
      reference: 'INST789012345',
      notes: 'فشل في المعالجة',
    },
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    name: '',
    type: 'credit_card',
    provider: '',
    fees: 0,
    minAmount: 0,
    maxAmount: 0,
    status: 'active',
    credentials: {},
    description: '',
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    const newId = Math.max(...paymentMethods.map((m) => m.id), 0) + 1;
    const newMethod = {
      id: newId,
      ...newPaymentMethod,
      icon: getMethodIcon(newPaymentMethod.type),
      currency: 'EGP',
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddMethodModal(false);
    setNewPaymentMethod({
      name: '',
      type: 'credit_card',
      provider: '',
      fees: 0,
      minAmount: 0,
      maxAmount: 0,
      status: 'active',
      credentials: {},
      description: '',
    });
  };

  const getMethodIcon = (type) => {
    switch (type) {
      case 'credit_card':
        return '💳';
      case 'mobile_wallet':
        return '📱';
      case 'digital_wallet':
        return '⚡';
      case 'bank_transfer':
        return '🏦';
      case 'crypto':
        return '₿';
      default:
        return '💰';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '✅ مكتمل';
      case 'pending':
        return '⏳ معلق';
      case 'failed':
        return '❌ فشل';
      case 'cancelled':
        return '🚫 ملغي';
      default:
        return status;
    }
  };

  const totalStats = {
    totalTransactions: transactions.length,
    completedTransactions: transactions.filter((t) => t.status === 'completed').length,
    pendingTransactions: transactions.filter((t) => t.status === 'pending').length,
    totalRevenue: transactions
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.netAmount, 0),
    totalFees: transactions
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.fees, 0),
  };

  const tabs = [
    { id: 'methods', name: 'طرق الدفع', icon: '💳' },
    { id: 'transactions', name: 'المعاملات', icon: '📊' },
    { id: 'analytics', name: 'التحليلات', icon: '📈' },
    { id: 'settings', name: 'الإعدادات', icon: '⚙️' },
  ];

  return (
    <>
      <Head>
        <title>إدارة طرق الدفع - Admin Panel</title>
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة طرق الدفع</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                إدارة شاملة لجميع طرق الدفع والمعاملات المالية
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              {
                label: 'إجمالي المعاملات',
                value: totalStats.totalTransactions,
                icon: '📊',
                color: 'from-blue-500 to-blue-600',
              },
              {
                label: 'معاملات مكتملة',
                value: totalStats.completedTransactions,
                icon: '✅',
                color: 'from-green-500 to-green-600',
              },
              {
                label: 'معاملات معلقة',
                value: totalStats.pendingTransactions,
                icon: '⏳',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                label: 'إجمالي الإيرادات',
                value: `${totalStats.totalRevenue.toLocaleString()} ج.م`,
                icon: '💰',
                color: 'from-purple-500 to-purple-600',
              },
              {
                label: 'الرسوم المحصلة',
                value: `${totalStats.totalFees.toLocaleString()} ج.م`,
                icon: '💸',
                color: 'from-indigo-500 to-indigo-600',
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
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                  <div className="text-2xl opacity-80">{stat.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 space-x-reverse px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <span className="ml-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Payment Methods Tab */}
              {activeTab === 'methods' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      طرق الدفع المتاحة
                    </h3>
                    <motion.button
                      onClick={() => setShowAddMethodModal(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ➕ إضافة طريقة دفع
                    </motion.button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paymentMethods.map((method, index) => (
                      <motion.div
                        key={method.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-3xl mr-3">{method.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {method.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {method.provider}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              method.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            }`}
                          >
                            {method.status === 'active' ? 'نشط' : 'معطل'}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex justify-between">
                            <span>الرسوم:</span>
                            <span>{method.fees}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>الحد الأدنى:</span>
                            <span>
                              {method.minAmount} {method.currency}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>الحد الأقصى:</span>
                            <span>
                              {method.maxAmount} {method.currency}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <motion.button
                            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            تعديل
                          </motion.button>
                          <motion.button
                            className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            تعطيل
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      سجل المعاملات
                    </h3>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>جميع الحالات</option>
                        <option>مكتمل</option>
                        <option>معلق</option>
                        <option>فشل</option>
                      </select>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        📥 تصدير
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            رقم المعاملة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            العميل
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            طريقة الدفع
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            المبلغ
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            ال��سوم
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            الحالة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            التاريخ
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {transactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {transaction.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {transaction.userName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {transaction.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {transaction.amount} ج.م
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {transaction.fees} ج.م
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
                              >
                                {getStatusText(transaction.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {new Date(transaction.date).toLocaleDateString('ar-EG')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => {
                                    setSelectedTransaction(transaction);
                                    setShowTransactionModal(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  👁️
                                </motion.button>
                                <motion.button
                                  className="text-green-600 hover:text-green-800 dark:text-green-400"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  ✅
                                </motion.button>
                                <motion.button
                                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  ❌
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    تحليلات المدفوعات
                  </h3>
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-4">📈</div>
                    <p>تحليلات مفصلة ستكون متاحة قريباً</p>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    إعدادات المدفوعات
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">إعدادات عامة</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          العملة الافتراضية
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                          <option>EGP - جنيه مصري</option>
                          <option>USD - دولار أمريكي</option>
                          <option>EUR - يورو</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          رسوم افتراضية (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          defaultValue="2.5"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">إعدادات الأمان</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          التحقق الثنائي للمدفوعات
                        </span>
                        <button className="w-12 h-6 bg-blue-600 rounded-full p-1 transition-colors">
                          <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          تشفير البيانات المالية
                        </span>
                        <button className="w-12 h-6 bg-blue-600 rounded-full p-1 transition-colors">
                          <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Add Payment Method Modal */}
          <AnimatePresence>
            {showAddMethodModal && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        إضافة طريقة دفع جديدة
                      </h3>
                      <button
                        onClick={() => setShowAddMethodModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            اسم طريقة الدفع *
                          </label>
                          <input
                            type="text"
                            required
                            value={newPaymentMethod.name}
                            onChange={(e) =>
                              setNewPaymentMethod({ ...newPaymentMethod, name: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            النوع *
                          </label>
                          <select
                            required
                            value={newPaymentMethod.type}
                            onChange={(e) =>
                              setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="credit_card">بطاقة ائتمان</option>
                            <option value="mobile_wallet">محفظة جوال</option>
                            <option value="digital_wallet">محفظة رقمية</option>
                            <option value="bank_transfer">تحويل بنكي</option>
                            <option value="crypto">عملة رقمية</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          مقدم الخدمة
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.provider}
                          onChange={(e) =>
                            setNewPaymentMethod({ ...newPaymentMethod, provider: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الرسوم (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={newPaymentMethod.fees}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                fees: parseFloat(e.target.value),
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الحد الأدنى
                          </label>
                          <input
                            type="number"
                            value={newPaymentMethod.minAmount}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                minAmount: parseInt(e.target.value),
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الحد الأقصى
                          </label>
                          <input
                            type="number"
                            value={newPaymentMethod.maxAmount}
                            onChange={(e) =>
                              setNewPaymentMethod({
                                ...newPaymentMethod,
                                maxAmount: parseInt(e.target.value),
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الوصف
                        </label>
                        <textarea
                          value={newPaymentMethod.description}
                          onChange={(e) =>
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              description: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          rows="3"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          إضافة طريقة الدفع
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setShowAddMethodModal(false)}
                          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium"
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

          {/* Transaction Details Modal */}
          <AnimatePresence>
            {showTransactionModal && selectedTransaction && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        تفاصيل المعاملة
                      </h3>
                      <button
                        onClick={() => setShowTransactionModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            رقم المعاملة:
                          </span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTransaction.id}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">العميل:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTransaction.userName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">المبلغ:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTransaction.amount} ج.م
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">الرسوم:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {selectedTransaction.fees} ج.م
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            المبلغ الصافي:
                          </span>
                          <p className="font-medium text-green-600">
                            {selectedTransaction.netAmount} ج.م
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">الحالة:</span>
                          <p
                            className={`font-medium ${
                              selectedTransaction.status === 'completed'
                                ? 'text-green-600'
                                : selectedTransaction.status === 'pending'
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`}
                          >
                            {getStatusText(selectedTransaction.status)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">المرجع:</span>
                        <p className="font-mono text-gray-900 dark:text-white">
                          {selectedTransaction.reference}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">ملاحظات:</span>
                        <p className="text-gray-900 dark:text-white">{selectedTransaction.notes}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <motion.button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        تأكيد
                      </motion.button>
                      <motion.button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        رفض
                      </motion.button>
                    </div>
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

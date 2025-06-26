import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    minQuantity: 100,
    maxQuantity: 100000,
    status: 'active',
    provider: '',
    providerServiceId: '',
    startTime: '0-1',
    speed: '1000-5000',
    refill: false,
    guarantee: 30,
  });

  const categories = [
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻' },
    { id: 'telegram', name: 'Telegram', icon: '📱' },
    { id: 'spotify', name: 'Spotify', icon: '🎵' },
    { id: 'other', name: 'أخرى', icon: '⭐' },
  ];

  const providers = [
    { id: 'provider1', name: 'Main Provider', status: 'active' },
    { id: 'provider2', name: 'Backup Provider', status: 'active' },
    { id: 'provider3', name: 'Premium Provider', status: 'active' },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newService.title,
          description: `${newService.description} | السعر: ${newService.price} | متوفر: ${newService.status === 'active'}`,
          category: newService.category,
          price: newService.price,
          min_quantity: newService.minQuantity,
          max_quantity: newService.maxQuantity,
          status: newService.status,
          provider: newService.provider,
          provider_service_id: newService.providerServiceId,
          start_time: newService.startTime,
          speed: newService.speed,
          refill: newService.refill,
          guarantee: newService.guarantee,
        }),
      });

      if (response.ok) {
        await fetchServices();
        setShowAddModal(false);
        setNewService({
          title: '',
          description: '',
          category: '',
          price: '',
          minQuantity: 100,
          maxQuantity: 100000,
          status: 'active',
          provider: '',
          providerServiceId: '',
          startTime: '0-1',
          speed: '1000-5000',
          refill: false,
          guarantee: 30,
        });
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      try {
        const response = await fetch(`/api/services?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchServices();
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && service.description?.includes('متوفر: true')) ||
      (filterStatus === 'inactive' && service.description?.includes('متوفر: false'));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <Head>
        <title>إدارة الخدمات - Admin Panel</title>
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الخدمات</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                إدارة شاملة لجميع خدمات المنصة
              </p>
            </div>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ➕ إضافة خدمة جديدة
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
                label: 'إجمالي الخدمات',
                value: services.length,
                icon: '⚙️',
                color: 'from-blue-500 to-blue-600',
              },
              {
                label: 'الخدمات النشطة',
                value: services.filter((s) => s.description?.includes('متوفر: true')).length,
                icon: '✅',
                color: 'from-green-500 to-green-600',
              },
              {
                label: 'الخدمات المعطلة',
                value: services.filter((s) => s.description?.includes('متوفر: false')).length,
                icon: '❌',
                color: 'from-red-500 to-red-600',
              },
              {
                label: 'الفئات',
                value: new Set(services.map((s) => s.category).filter(Boolean)).size,
                icon: '📂',
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
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="البحث في الخدمات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">جميع الفئات</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">معطل</option>
              </select>
            </div>
          </motion.div>

          {/* Services Table */}
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
                        الخدمة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        الفئة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        السعر
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
                    {filteredServices.map((service, index) => (
                      <motion.tr
                        key={service.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {categories.find((c) => c.id === service.category)?.icon || '⭐'}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {service.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                {service.description?.split('|')[0]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                            {categories.find((c) => c.id === service.category)?.name || 'غير محدد'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                          {service.description?.match(/السعر:\s*(\d+)/)?.[1] || 'غير محدد'} ج.م
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              service.description?.includes('متوفر: true')
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            }`}
                          >
                            {service.description?.includes('متوفر: true') ? '✅ نشط' : '❌ معطل'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <motion.button
                              onClick={() => handleEditService(service)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ✏️
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              🗑️
                            </motion.button>
                            <motion.button
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              📊
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

          {/* Add Service Modal */}
          <AnimatePresence>
            {showAddModal && (
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
                        إضافة خدمة جديدة
                      </h3>
                      <button
                        onClick={() => setShowAddModal(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddService} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            اسم الخدمة *
                          </label>
                          <input
                            type="text"
                            required
                            value={newService.title}
                            onChange={(e) =>
                              setNewService({ ...newService, title: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="مثال: متابعين إنستقرام عرب"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الفئة *
                          </label>
                          <select
                            required
                            value={newService.category}
                            onChange={(e) =>
                              setNewService({ ...newService, category: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">اختر الفئة</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            السعر (ج.م لكل 1000) *
                          </label>
                          <input
                            type="number"
                            required
                            step="0.01"
                            value={newService.price}
                            onChange={(e) =>
                              setNewService({ ...newService, price: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الحالة *
                          </label>
                          <select
                            value={newService.status}
                            onChange={(e) =>
                              setNewService({ ...newService, status: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="active">نشط</option>
                            <option value="inactive">معطل</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الحد الأدنى
                          </label>
                          <input
                            type="number"
                            value={newService.minQuantity}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                minQuantity: parseInt(e.target.value),
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
                            value={newService.maxQuantity}
                            onChange={(e) =>
                              setNewService({
                                ...newService,
                                maxQuantity: parseInt(e.target.value),
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الوصف *
                        </label>
                        <textarea
                          required
                          value={newService.description}
                          onChange={(e) =>
                            setNewService({ ...newService, description: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          rows="3"
                          placeholder="وصف تفصيلي للخدمة..."
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <motion.button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          إضافة الخدمة
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setShowAddModal(false)}
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
        </div>
      </AdminLayout>
    </>
  );
}

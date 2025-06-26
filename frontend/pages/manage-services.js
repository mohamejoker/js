import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import ServicesTable from '../components/dashboard/ServicesTable';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newService.title,
          description: `${newService.description} | السعر: ${newService.price} | متوفر: true`,
          category: newService.category,
        }),
      });

      if (response.ok) {
        await fetchServices();
        setNewService({ title: '', description: '', category: '', price: '' });
        setShowAddForm(false);
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
        <title>إدارة الخدمات - Town Media Agent</title>
        <meta name="description" content="إدارة وتحرير الخدمات المتاحة" />
      </Head>

      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الخدمات</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                عرض وإدارة جميع الخدمات المتاحة في المنصة
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              ➕ إضافة خدمة جديدة
            </button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الخدمات</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {services.length}
                  </p>
                </div>
                <div className="text-3xl">⚙️</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الخدمات المتاحة</p>
                  <p className="text-2xl font-bold text-green-600">
                    {services.filter((s) => s.description?.includes('متوفر: true')).length}
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الفئات</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(services.map((s) => s.category).filter(Boolean)).size}
                  </p>
                </div>
                <div className="text-3xl">📂</div>
              </div>
            </div>
          </motion.div>

          {/* Services Table */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">قائمة الخدمات</h2>
            </div>
            <ServicesTable services={services} onDelete={handleDeleteService} />
          </motion.div>

          {/* Add Service Modal */}
          {showAddForm && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  إضافة خدمة جديدة
                </h3>

                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      عنوان الخدمة
                    </label>
                    <input
                      type="text"
                      required
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الوصف
                    </label>
                    <textarea
                      required
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({ ...newService, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الفئة
                    </label>
                    <input
                      type="text"
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="مثل: Instagram, Twitter"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      السعر (جنيه مصري)
                    </label>
                    <input
                      type="number"
                      required
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex space-x-4 space-x-reverse pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      إضافة الخدمة
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layout/DashboardLayout';
import { getAuthToken } from '../utils/auth';

export default function Order() {
  const router = useRouter();
  const { service, type } = router.query;
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [orderData, setOrderData] = useState({
    serviceId: '',
    quantity: 1000,
    targetUrl: '',
    notes: '',
  });

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);

        // إذا كان هناك خدمة محددة من الرابط
        if (service && type) {
          const matchedService = data.find(
            (s) => s.title.includes(service) || s.title.includes(type)
          );
          if (matchedService) {
            setSelectedService(matchedService);
            setOrderData((prev) => ({ ...prev, serviceId: matchedService.id }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: orderData.serviceId,
          quantity: orderData.quantity,
          target_url: orderData.targetUrl,
          notes: orderData.notes,
          user_id: 1, // سيتم تحديثه لاحقاً من التوكن
        }),
      });

      if (response.ok) {
        router.push('/dashboard?message=order_created');
      } else {
        alert('فشل في إنشاء الطلب');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('حدث خطأ أثناء إنشاء الطلب');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setOrderData((prev) => ({ ...prev, serviceId: service.id }));
  };

  const calculatePrice = () => {
    if (!selectedService) return 0;
    const description = selectedService.description || '';
    const priceMatch = description.match(/السعر:\s*(\d+)/);
    const basePrice = priceMatch ? parseInt(priceMatch[1]) : 10;
    return ((orderData.quantity / 1000) * basePrice).toFixed(2);
  };

  const serviceCategories = [
    { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
    { name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
    { name: 'YouTube', icon: '📺', color: 'bg-red-500' },
    { name: 'TikTok', icon: '🎵', color: 'bg-black' },
    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
    { name: 'Snapchat', icon: '👻', color: 'bg-yellow-500' },
  ];

  return (
    <>
      <Head>
        <title>طلب خدمة جديدة - Town Media Agent</title>
        <meta name="description" content="اطلب خدمة زيادة متابعين أو مشاهدات" />
      </Head>

      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              طلب خدمة جديدة
            </h1>
            <p className="text-gray-600 dark:text-gray-400">اختر الخدمة المطلوبة وأدخل التفاصيل</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Categories */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  فئات الخدمات
                </h3>

                <div className="space-y-3">
                  {serviceCategories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        const categoryServices = services.filter((s) =>
                          s.title.toLowerCase().includes(category.name.toLowerCase())
                        );
                        console.log(categoryServices);
                      }}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-auto">
                        {
                          services.filter((s) =>
                            s.title.toLowerCase().includes(category.name.toLowerCase())
                          ).length
                        }{' '}
                        خدمة
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Services */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  الخدمات الشائعة
                </h3>

                <div className="space-y-2">
                  {services.slice(0, 5).map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                        selectedService?.id === service.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {service.title?.slice(0, 30) + (service.title?.length > 30 ? '...' : '')}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Order Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form
                onSubmit={handleSubmitOrder}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  تفاصيل الطلب
                </h3>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اختر الخدمة
                  </label>
                  <select
                    value={orderData.serviceId}
                    onChange={(e) => {
                      const service = services.find((s) => s.id == e.target.value);
                      handleServiceSelect(service);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">اختر خدمة...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Service Details */}
                {selectedService && (
                  <motion.div
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                      {selectedService.title}
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      {selectedService.description?.split('|')[0]}
                    </p>
                  </motion.div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الكمية
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="100000"
                    step="100"
                    value={orderData.quantity}
                    onChange={(e) =>
                      setOrderData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    الحد الأدنى: 100 • الحد الأقصى: 100,000
                  </p>
                </div>

                {/* Target URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رابط الحساب أو المنشور
                  </label>
                  <input
                    type="url"
                    value={orderData.targetUrl}
                    onChange={(e) =>
                      setOrderData((prev) => ({ ...prev, targetUrl: e.target.value }))
                    }
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    value={orderData.notes}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, notes: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="أي ملاحظات خاصة بالطلب..."
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300">الكمية:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {orderData.quantity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300">السعر لكل 1000:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedService ? calculatePrice() / (orderData.quantity / 1000) : 0} ج.م
                    </span>
                  </div>
                  <hr className="my-2 border-gray-300 dark:border-gray-600" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      إجمالي التكلفة:
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {calculatePrice()} ج.م
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !selectedService}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      جاري الإرسال...
                    </div>
                  ) : (
                    '🚀 تأكيد الطلب'
                  )}
                </motion.button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>✅ جميع الطلبات آمنة ومضمونة</p>
                  <p>⚡ يبدأ التنفيذ خلال 5-15 دقيقة</p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

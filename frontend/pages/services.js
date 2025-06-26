import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import ServiceCard from '../components/common/ServiceCard';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // تصفية الخدمات حسب البحث والفئة
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // استخراج الفئات المتاحة
  const categories = ['all', ...new Set(services.map((s) => s.category).filter(Boolean))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Head>
        <title>الخدمات - Town Media Agent</title>
        <meta name="description" content="تصفح جميع الخدمات المتاحة في منصة Town Media Agent" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                خدماتنا المتميزة
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                اكتشف مجموعة واسعة من الخدمات المتخصصة في مجال وسائل التواصل الاجتماعي والتسويق
                الرقمي
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Search */}
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="البحث في الخدمات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2 space-x-reverse">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category === 'all' ? 'جميع الفئات' : category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Services Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <motion.div key={service.id} variants={itemVariants}>
                      <ServiceCard service={service} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div className="col-span-full text-center py-20" variants={itemVariants}>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      لا توجد خدمات
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm || selectedCategory !== 'all'
                        ? 'لم يتم العثور على خدمات تطابق البحث'
                        : 'لا توجد خدمات متاحة حالياً'}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div
              className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{services.length}+</div>
                  <div className="text-gray-600 dark:text-gray-400">خدمة متاحة</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
                  <div className="text-gray-600 dark:text-gray-400">معدل الإنجاز</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-400">دعم متواصل</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

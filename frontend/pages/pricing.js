import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('instagram');

  const categories = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-pink-500 to-purple-600' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'from-blue-500 to-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-700' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-black to-purple-600' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'from-sky-400 to-blue-600' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻', color: 'from-yellow-400 to-yellow-600' },
  ];

  const pricingData = {
    instagram: [
      {
        service: 'متابعين إنستقرام عرب',
        price: 5,
        per: '1000',
        description: 'متابعين حقيقيين عرب نشطين',
        popular: true,
      },
      {
        service: 'متابعين إنستقرام عالميين',
        price: 3,
        per: '1000',
        description: 'متابعين حقيقيين من جميع أنحاء العالم',
      },
      {
        service: 'إعجابات إنستقرام',
        price: 2,
        per: '1000',
        description: 'إعجابات سريعة وآمنة للمنش��رات',
      },
      {
        service: 'مشاهدات ريلز',
        price: 3,
        per: '1000',
        description: 'مشاهدات حقيقية لفيديوهات الريلز',
      },
      { service: 'تعليقات إنستقرام', price: 8, per: '100', description: 'تعليقات طبيعية ومتنوعة' },
      { service: 'مشاهدات الستوري', price: 1, per: '1000', description: 'مشاهدات للقصص والستوري' },
    ],
    facebook: [
      {
        service: 'متابعين صفحة فيسبوك',
        price: 4,
        per: '1000',
        description: 'متابعين للصفحات التجارية',
        popular: true,
      },
      {
        service: 'إعجابات المنشورات',
        price: 2,
        per: '1000',
        description: 'إعجابات للمنشورات والصور',
      },
      {
        service: 'مشاركات المنشورات',
        price: 6,
        per: '500',
        description: 'مشاركات لزيادة الانتشار',
      },
      {
        service: 'مشاهدات الفيديو',
        price: 3,
        per: '1000',
        description: 'مشاهدات لفيديوهات الفيسبوك',
      },
      { service: 'أصدقاء فيسبوك', price: 7, per: '500', description: 'طلبات صداقة حقيقية' },
      { service: 'تعليقات فيسبوك', price: 10, per: '100', description: 'تعليقات طبيعية ومفيدة' },
    ],
    youtube: [
      {
        service: 'مشتركين يوتيوب',
        price: 15,
        per: '1000',
        description: 'مشتركين حقيقيين للقناة',
        popular: true,
      },
      { service: 'مشاهدات الفيديو', price: 5, per: '1000', description: 'مشاهدات آمنة للفيديوهات' },
      { service: 'إعجابات الفيديو', price: 8, per: '1000', description: 'إعجابات لتحسين التفاعل' },
      { service: 'تعليقات يوتيوب', price: 12, per: '100', description: 'تعليقات مفيدة وإيجابية' },
      {
        service: 'ساعات مشاهدة',
        price: 20,
        per: '1000',
        description: 'ساعات مشاهدة لتحسين الترتيب',
      },
      { service: 'مشاركات الفيديو', price: 15, per: '500', description: 'مشاركات لزيادة الانتشار' },
    ],
    tiktok: [
      {
        service: 'متابعين تيك توك',
        price: 6,
        per: '1000',
        description: 'متابعين نشطين لحسابك',
        popular: true,
      },
      {
        service: 'إعجابات تيك توك',
        price: 3,
        per: '1000',
        description: 'إعجابات سريعة للفيديوهات',
      },
      { service: 'مشاهدات تيك توك', price: 2, per: '1000', description: 'مشاهدات لزيادة الانتشار' },
      { service: 'مشاركات تيك توك', price: 8, per: '500', description: 'مشاركات لتوسيع الوصول' },
      { service: 'تعليقات تيك توك', price: 10, per: '100', description: 'تعليقات تفاعلية' },
      { service: 'مفضلة تيك توك', price: 5, per: '1000', description: 'إضافة للمفضلة' },
    ],
    twitter: [
      {
        service: 'متابعين تويتر',
        price: 8,
        per: '1000',
        description: 'متابعين حقيقيين ونشطين',
        popular: true,
      },
      { service: 'إعجابات تويتر', price: 4, per: '1000', description: 'إعجابات للتغريدات' },
      { service: 'إعادة تغريد', price: 6, per: '500', description: 'إعادة تغريد لزيادة الانتشار' },
      { service: 'تعليقات تويتر', price: 10, per: '100', description: 'ردود وتعليقات تفاعلية' },
      { service: 'مشاهدات الفيديو', price: 3, per: '1000', description: 'مشاهدات لفيديوهات تويتر' },
      { service: 'نقرات الرابط', price: 7, per: '1000', description: 'نقرات لزيادة الزيارات' },
    ],
    snapchat: [
      {
        service: 'متابعين سناب شات',
        price: 10,
        per: '1000',
        description: 'متابعين لحسابك الشخصي',
        popular: true,
      },
      { service: 'مشاهدات القصة', price: 5, per: '1000', description: 'مشاهدات للقصص اليومية' },
      { service: 'نقاط سناب', price: 15, per: '10000', description: 'زيادة نقاط السناب' },
      { service: 'فتح السناب', price: 4, per: '1000', description: 'فتح الرسائل المرسلة' },
      { service: 'مشاهدات الفيديو', price: 6, per: '1000', description: 'مشاهدات لفيديوهات سناب' },
    ],
  };

  const packages = [
    {
      name: 'الباقة الأساسية',
      price: 50,
      description: 'مثالية للمبتدئين',
      features: ['5 خدمات مختلفة', 'دعم فني أساسي', 'تسليم خلال 24 ساعة', 'ضمان لمدة 7 أيام'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'الباقة المتقدمة',
      price: 150,
      description: 'الأكثر شعبية',
      features: [
        '15 خدمة مختلفة',
        'دعم فني أولوية',
        'تسليم خلال 12 ساعة',
        'ضمان لمدة 15 يوم',
        'خصم 15% على الطلبات',
      ],
      color: 'from-purple-500 to-purple-600',
      popular: true,
    },
    {
      name: 'الباقة الاحترا��ية',
      price: 300,
      description: 'للمحترفين والشركات',
      features: [
        'جميع الخدمات متاحة',
        'دعم فني VIP',
        'تسليم خلال 6 ساعات',
        'ضمان لمدة 30 يوم',
        'خصم 25% على الطلبات',
        'مدير حساب مخصص',
      ],
      color: 'from-gold-500 to-yellow-600',
    },
  ];

  return (
    <>
      <Head>
        <title>الأسعار - Town Media Agent</title>
        <meta
          name="description"
          content="تصفح أسعار خدمات زيادة المتابعين والمشاهدات لجميع منصات التواصل الاجتماعي. أسعار منافسة وخدمات عالية الجودة"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                أسعار خدماتنا
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                أسعار منافسة وشفافة لجميع خدمات السوشيال ميديا. اختر ما يناسبك وابدأ النمو اليوم
              </p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-3 space-x-reverse px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </motion.div>

            {/* Pricing Grid */}
            <motion.div
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {pricingData[activeCategory]?.map((item, index) => (
                <motion.div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative ${
                    item.popular ? 'ring-2 ring-blue-500' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {item.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        الأكثر شعبية
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.service}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {item.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {item.price} ج.م
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/ {item.per}</span>
                    </div>

                    <Link href={`/order?service=${activeCategory}&type=${item.service}`}>
                      <motion.button
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        اطلب الآن
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Packages Section */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  الباقات الشاملة
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  باقات متكاملة بخصومات خاصة
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center relative ${
                      pkg.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-purple-500 text-white px-6 py-2 rounded-full font-medium">
                          الأكثر شعبية
                        </span>
                      </div>
                    )}

                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center`}
                    >
                      <span className="text-2xl text-white">💎</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{pkg.description}</p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {pkg.price} ج.م
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/ شهرياً</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      className={`w-full py-3 bg-gradient-to-r ${pkg.color} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      اختر هذه الباقة
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  أسئلة حول الأسعار
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    q: 'هل الأسعار شاملة الضرائب؟',
                    a: 'نعم، جميع الأسعار المعروضة شاملة الضرائب والرسوم. ما تراه هو ما ستدفعه.',
                  },
                  {
                    q: 'هل يمكنني الحصول على خصم للطلبات الكبيرة؟',
                    a: 'نعم، نوفر خصومات خاصة للطلبات الكبيرة. تواصل معنا للحصول على عرض سعر مخصص.',
                  },
                  {
                    q: 'ما هي طرق الدفع المقبولة؟',
                    a: 'نقبل جميع بطاقات الائتمان، فودافون كاش، إنستاباي، والتحويل البنكي.',
                  },
                  {
                    q: 'هل يمكنني إلغاء الطلب واسترداد المال؟',
                    a: 'يمكن إلغاء الطلب قبل بدء التنفيذ واسترداد المال كاملاً. بعد البدء، نوفر ضمان جزئي.',
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

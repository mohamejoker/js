import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ServiceCard = ({ service }) => {
  const getServiceIcon = (title) => {
    const lowerTitle = title?.toLowerCase() || '';
    if (lowerTitle.includes('instagram')) return '📷';
    if (lowerTitle.includes('twitter') || lowerTitle.includes('تويتر')) return '🐦';
    if (lowerTitle.includes('facebook') || lowerTitle.includes('فيسبوك')) return '📘';
    if (lowerTitle.includes('youtube') || lowerTitle.includes('يوتيوب')) return '📺';
    if (lowerTitle.includes('tiktok') || lowerTitle.includes('تيك توك')) return '🎵';
    if (lowerTitle.includes('snapchat') || lowerTitle.includes('سناب شات')) return '👻';
    if (lowerTitle.includes('linkedin') || lowerTitle.includes('لينكدين')) return '💼';
    return '⭐';
  };

  const extractPrice = (description) => {
    if (!description) return null;
    const priceMatch = description.match(/السعر:\s*(\d+)/);
    return priceMatch ? priceMatch[1] : null;
  };

  const extractAvailability = (description) => {
    if (!description) return null;
    const availMatch = description.match(/متوفر:\s*(\w+)/);
    return availMatch ? availMatch[1] : null;
  };

  const price = extractPrice(service.description);
  const availability = extractAvailability(service.description);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

        <div className="relative z-10">
          <div className="text-3xl mb-3">{getServiceIcon(service.title)}</div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {service.title || 'خدمة بدون عنوان'}
          </h3>

          {/* Availability Badge */}
          {availability && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                availability === 'true' || availability === 'متاح'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {availability === 'true' || availability === 'متاح' ? '✅ متاح' : '❌ غير متاح'}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {service.description || 'لا يوجد وصف متاح لهذه الخدمة'}
        </p>

        {/* Price */}
        {price && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">السعر:</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{price} ج.م</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 space-x-reverse">
          <Link
            href={`/service-details?id=${service.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium"
          >
            عرض التفاصيل
          </Link>
          <Link
            href={`/order?service=${service.id}`}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-center py-2 px-4 rounded-lg transition-all font-medium"
          >
            طلب الآن
          </Link>
        </div>

        {/* Service ID */}
        <div className="mt-3 text-xs text-gray-400 text-center">ID: #{service.id}</div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </motion.div>
  );
};

export default ServiceCard;

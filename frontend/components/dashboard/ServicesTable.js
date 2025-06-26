import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ServicesTable = ({ services = [], onDelete }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedServices = [...services].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const extractPrice = (description) => {
    if (!description) return 'غير محدد';
    const priceMatch = description.match(/السعر:\s*(\d+)/);
    return priceMatch ? `${priceMatch[1]} ج.م` : 'غير محدد';
  };

  const extractAvailability = (description) => {
    if (!description) return false;
    return description.includes('متوفر: true');
  };

  const getServiceIcon = (title) => {
    const lowerTitle = title?.toLowerCase() || '';
    if (lowerTitle.includes('instagram')) return '📷';
    if (lowerTitle.includes('twitter') || lowerTitle.includes('تويتر')) return '🐦';
    if (lowerTitle.includes('facebook') || lowerTitle.includes('فيسبوك')) return '📘';
    if (lowerTitle.includes('youtube') || lowerTitle.includes('يوتيوب')) return '📺';
    if (lowerTitle.includes('tiktok') || lowerTitle.includes('تيك توك')) return '🎵';
    if (lowerTitle.includes('snapchat') || lowerTitle.includes('سناب شات')) return '👻';
    return '⭐';
  };

  if (services.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        <div className="text-4xl mb-4">⚙️</div>
        <p>لا توجد خدمات حالياً</p>
        <p className="text-sm mt-2">قم بإضافة خدمة جديدة للبدء</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleSort('id')}
            >
              الرقم
              {sortField === 'id' && (
                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              الأيقونة
            </th>
            <th
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleSort('title')}
            >
              اسم الخدمة
              {sortField === 'title' && (
                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              الوصف
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
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedServices.map((service, index) => (
            <motion.tr
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{service.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-2xl">
                {getServiceIcon(service.title)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {service.title || 'بدون عنوان'}
                </div>
                {service.category && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">{service.category}</div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-xs">
                <div className="line-clamp-2">
                  {service.description?.split('|')[0] || 'لا يوجد وصف'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                {extractPrice(service.description)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    extractAvailability(service.description)
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}
                >
                  {extractAvailability(service.description) ? '✅ متاح' : '❌ غير متاح'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2 space-x-reverse">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    ✏️ تعديل
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(service.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    🗑️ حذف
                  </button>
                  <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                    👁️ عرض
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesTable;

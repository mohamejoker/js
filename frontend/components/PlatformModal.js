import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const platformsData = {
  soundcloud: {
    nameAr: 'ساوند كلاود',
    nameEn: 'SoundCloud',
    descAr: 'تعزيز الموسيقى الخاصة بك مع مستمعين حقيقيين ومتابعين نشطين',
    descEn: 'Promote your music with real listeners and active followers',
    features: ['تشغيلات الموسيقى', 'متابعين حقيقيين', 'إعجابات', 'تعليقات مفيدة', 'إعادة نشر'],
    color: 'from-orange-500 to-orange-600',
    gradient: 'linear-gradient(45deg, #ff5500, #ff8800)'
  },
  // ...باقي المنصات...
};

const PlatformModal = ({ platform, isOpen, onClose }) => {
  const { t } = useTranslation();
  const info = platformsData[platform];
  if (!info) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.7, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0, y: 50 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={e => e.stopPropagation()} className="relative max-w-md w-full mx-4">
            <div className="absolute inset-0 rounded-3xl opacity-60 blur-xl" style={{ background: info.gradient }} />
            <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl" style={{ background: info.gradient }}>
                  <div className="w-12 h-12">{/* Platform icon */}</div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{info.nameAr}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{info.descAr}</p>
              </div>
              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">الخدمات المتاحة:</h4>
                {info.features.map((feature, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-3 h-3 rounded-full shadow-lg" style={{ background: info.gradient }} />
                    <span className="text-gray-200 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: info.gradient }} className="flex-1 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">اطلب الخدمة الآن</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="px-6 py-4 border-2 border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 transition-colors duration-300">إغلاق</motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformModal;

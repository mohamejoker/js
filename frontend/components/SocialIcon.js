import React from 'react';
import { motion } from 'framer-motion';

const SocialIcon = ({ platform, size = 90, onClick, isActive }) => {
  const platforms = {
    soundcloud: {
      color: 'linear-gradient(45deg, #ff5500 0%, #ff8800 100%)',
      name: 'SoundCloud',
      nameAr: 'ساوند كلاود',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          {/* ...icon path... */}
        </svg>
      )
    },
    // ...باقي المنصات...
  };
  const platformData = platforms[platform];
  if (!platformData) return null;
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -8, rotateY: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 ${isActive ? 'z-20' : 'z-10'}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 hover:border-white/50 transition-all duration-300 relative overflow-hidden" style={{ background: platformData.color }}>
        <div className="w-12 h-12">{platformData.icon}</div>
        {/* Shimmer effect */}
        <motion.div className="absolute inset-0 opacity-0 hover:opacity-20" style={{ background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)', transform: 'translateX(-100%)' }} whileHover={{ transform: 'translateX(100%)', transition: { duration: 0.6 } }} />
      </div>
      <motion.div className="absolute inset-0 rounded-full opacity-0 hover:opacity-40 transition-opacity duration-300 -z-10" style={{ background: platformData.color, filter: 'blur(25px)', transform: 'scale(1.1)' }} />
      <motion.div initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }} className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-lg border border-gray-700">{platformData.nameAr}</motion.div>
    </motion.div>
  );
};

export default SocialIcon;

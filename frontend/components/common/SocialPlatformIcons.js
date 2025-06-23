import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export default function SocialPlatformIcons({ platforms, onClick, active }) {
  // عرض أيقونات المنصات الاجتماعية بشكل متناسق مع الثيم
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center py-4">
      {platforms.map((platform, i) => (
        <button
          key={platform.name}
          className={`rounded-full p-3 shadow-lg border-2 transition ${active === platform.name ? 'border-blue-400' : 'border-gray-700'} bg-gray-900 hover:bg-blue-900`}
          onClick={() => onClick && onClick(platform.name)}
        >
          {platform.icon}
        </button>
      ))}
    </div>
  );
}

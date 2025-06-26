import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({
  message = 'جاري التحميل...',
  size = 'default',
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  const textSizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-xl',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    : `flex items-center justify-center p-4 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4`}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-600 dark:text-gray-300 font-medium ${textSizeClasses[size]}`}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;

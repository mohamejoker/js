import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, content, avatar, delay = 0, rating = 5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      {/* Card */}
      <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 text-blue-400/30 group-hover:text-blue-400/50 transition-colors duration-300">
          <Quote className="w-8 h-8" />
        </div>
        
        {/* Rating */}
        <div className="flex text-yellow-400 mb-6">
          {[...Array(rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + (i * 0.1) }}
            >
              <Star className="w-5 h-5 fill-current" />
            </motion.div>
          ))}
        </div>
        
        {/* Content */}
        <blockquote className="text-gray-300 leading-relaxed mb-8 text-lg relative">
          <span className="text-blue-400/50 text-4xl absolute -top-4 -left-2">"</span>
          {content}
          <span className="text-blue-400/50 text-4xl absolute -bottom-6 -right-2">"</span>
        </blockquote>
        
        {/* Author */}
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <img 
              src={avatar} 
              alt={name} 
              className="w-14 h-14 rounded-full object-cover mr-4 rtl:ml-4 rtl:mr-0 border-2 border-gray-600 group-hover:border-blue-500 transition-colors duration-300" 
            />
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800" />
          </motion.div>
          
          <div>
            <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors duration-300">
              {name}
            </h4>
            <p className="text-gray-400 text-sm font-medium">
              {role}
            </p>
          </div>
        </div>
        
        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

// تم تبسيط المكون ليكون متوافقًا مع التصميم الجديد للصفحة الرئيسية أو يمكن حذفه إذا لم يعد مستخدمًا.
export default function TestimonialCard() {
  return null;
}
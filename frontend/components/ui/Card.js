import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'default',
  gradient = false,
  shadow = 'default',
  border = true,
  ...props
}) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800',
    glass: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg',
    gradient:
      'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
    outline: 'bg-transparent border-2',
  };

  const paddings = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const shadows = {
    none: '',
    small: 'shadow-sm',
    default: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverEffects = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';

  const borderClasses = border ? 'border border-gray-200 dark:border-gray-700' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-xl
        ${variants[variant]}
        ${paddings[padding]}
        ${shadows[shadow]}
        ${hoverEffects}
        ${borderClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 ${className}`}>
    {children}
  </div>
);

// Card Title Component
const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}>{children}</h3>
);

// Card Description Component
const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${className}`}>{children}</p>
);

// Card Content Component
const CardContent = ({ children, className = '' }) => (
  <div className={`text-gray-700 dark:text-gray-300 ${className}`}>{children}</div>
);

// Card Footer Component
const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mt-6 ${className}`}>
    {children}
  </div>
);

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;

import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      success,
      required = false,
      disabled = false,
      icon: Icon,
      iconPosition = 'left',
      helper,
      className = '',
      containerClassName = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasError = Boolean(error);
    const hasSuccess = Boolean(success);

    return (
      <div className={`w-full ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {Icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon
                size={18}
                className={`
                ${hasError ? 'text-red-400' : hasSuccess ? 'text-green-400' : 'text-gray-400'}
                ${focused ? 'text-blue-500' : ''}
              `}
              />
            </div>
          )}

          {/* Input Field */}
          <motion.input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`
            w-full px-4 py-3 text-sm
            bg-white dark:bg-gray-800
            border rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon && iconPosition === 'left' ? 'pl-11' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${
              hasError
                ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500 text-red-900 dark:text-red-100'
                : hasSuccess
                  ? 'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500 text-green-900 dark:text-green-100'
                  : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white'
            }
            ${className}
          `}
            {...props}
          />

          {/* Right Icon */}
          {Icon && iconPosition === 'right' && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Icon
                size={18}
                className={`
                ${hasError ? 'text-red-400' : hasSuccess ? 'text-green-400' : 'text-gray-400'}
                ${focused ? 'text-blue-500' : ''}
              `}
              />
            </div>
          )}

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {/* Status Icons */}
          {(hasError || hasSuccess) && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {hasError && <AlertCircle size={18} className="text-red-400" />}
              {hasSuccess && <CheckCircle size={18} className="text-green-400" />}
            </div>
          )}
        </div>

        {/* Helper Text / Error / Success Message */}
        {(helper || error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-start space-x-1 space-x-reverse"
          >
            {hasError && <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />}
            {hasSuccess && (
              <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
            )}
            <p
              className={`text-xs ${
                hasError
                  ? 'text-red-600 dark:text-red-400'
                  : hasSuccess
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {error || success || helper}
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

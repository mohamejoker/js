import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(parseFloat(latest.toFixed(decimals)));
    });

    return unsubscribe;
  }, [springValue, decimals]);

  // تنسيق الأرقام بالفاصلة العربية
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ar-EG').format(num);
  };

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {formatNumber(displayValue)}
    </motion.span>
  );
};

export default AnimatedCounter;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Play, Sparkles, Zap, TrendingUp, Users, Star } from 'lucide-react';

export default function Hero() {
  const [welcomeText, setWelcomeText] = useState('مرحبًا بك في Town Media!');
  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => setWelcomeText(data.welcomeText || 'مرحبًا بك في Town Media!'));
  }, []);
  return (
    <section className="py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-500">{welcomeText}</h1>
    </section>
  );
}
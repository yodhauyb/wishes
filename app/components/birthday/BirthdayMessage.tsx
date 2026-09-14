'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig, EventType } from '../../types/birthday';

interface BirthdayMessageProps {
  message: string;
  name: string;
  senderName: string;
  themeConfig: ThemeConfig;
  onNext: () => void;
  eventType?: EventType;
}

export const BirthdayMessage: React.FC<BirthdayMessageProps> = ({ 
  message, name, senderName, themeConfig, onNext, eventType = 'birthday' 
}) => {
  
  // Event ke hisaab se chota badge aur icon set karna
  const getEventBadge = () => {
    switch (eventType) {
      case 'anniversary': return { icon: '🥂', text: 'FOREVER & ALWAYS' };
      case 'rakshabandhan': return { icon: '🏵️', text: 'BOND OF LOVE' };
      case 'valentines': return { icon: '💘', text: 'TRUE LOVE' };
      default: return { icon: '✨', text: 'SPECIAL WISHES' };
    }
  };

  const badge = getEventBadge();

  return (
    <div className="flex flex-col h-full p-6 relative overflow-hidden" onClick={onNext}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 flex flex-col h-full justify-center p-6 rounded-3xl ${themeConfig.cardClass} shadow-2xl backdrop-blur-sm border border-white/20`}
      >
        <div className="text-center mb-6">
          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black tracking-widest uppercase mb-4 text-white shadow-sm">
            <span>{badge.icon}</span> {badge.text}
          </span>
          <h3 className={`text-2xl font-black ${themeConfig.textClass} drop-shadow-md`}>
            For {name},
          </h3>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <p className="text-white/90 text-lg md:text-xl text-center leading-relaxed font-medium drop-shadow-sm">
            "{message}"
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/60 mb-1 font-semibold">With lots of love,</p>
          <p className={`text-xl font-black ${themeConfig.textClass} signature-font tracking-wide`}>
            {senderName}
          </p>
        </div>
      </motion.div>
      
      <div className="absolute bottom-6 left-0 w-full text-center z-20">
        <span className="text-[10px] text-white/50 font-bold tracking-widest uppercase bg-black/20 px-3 py-1.5 rounded-full animate-pulse">
          Tap to continue
        </span>
      </div>
    </div>
  );
};
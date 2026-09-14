'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EventType } from '../../types/birthday';

interface NameRevealProps {
  name: string;
  onNext: () => void;
  eventType?: EventType;
}

export const NameReveal: React.FC<NameRevealProps> = ({ name, onNext, eventType = 'birthday' }) => {
  // Event ke hisaab se Title aur Icon badalna
  const getEventContent = () => {
    switch (eventType) {
      case 'anniversary': return { icon: '🥂', title: 'HAPPY ANNIVERSARY,' };
      case 'rakshabandhan': return { icon: '🏵️', title: 'HAPPY RAKHI,' };
      case 'valentines': return { icon: '🌹', title: 'HAPPY VALENTINE\'S DAY,' };
      default: return { icon: '🎂', title: 'HAPPY BIRTHDAY,' };
    }
  };

  const content = getEventContent();

  return (
    <div 
      className="flex flex-col items-center justify-center h-full text-center p-6 cursor-pointer" 
      onClick={onNext}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl mb-6 drop-shadow-xl"
      >
        {content.icon}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="text-3xl font-black text-white mb-4 leading-tight drop-shadow-lg"
      >
        {content.title} <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-rose-500 uppercase tracking-wider text-5xl mt-2 block">
          {name}!
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-white/50 text-xs uppercase tracking-widest font-bold mt-8 animate-pulse bg-black/20 px-4 py-2 rounded-full border border-white/10"
      >
        Tap anywhere to continue
      </motion.p>
    </div>
  );
};
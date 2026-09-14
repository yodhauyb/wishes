'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EventType } from '../../types/birthday';

interface BirthdayIntroProps {
  name: string;
  onOpen: () => void;
  eventType?: EventType;
}

export const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ name, onOpen, eventType = 'birthday' }) => {
  // Event ke hisaab se icon aur text set karna
  const getEventContent = () => {
    switch (eventType) {
      case 'anniversary': 
        return { icon: '💝', text: 'A beautiful milestone just for you...' };
      case 'rakshabandhan': 
        return { icon: '🏵️', text: 'A special bond, a special surprise...' };
      case 'valentines': 
        return { icon: '💌', text: 'A token of my love for you...' };
      default: 
        return { icon: '🎁', text: 'A special surprise just for you...' };
    }
  };

  const content = getEventContent();

  return (
    <div 
      className="flex flex-col items-center justify-center h-full text-center p-6 cursor-pointer"
      onClick={onOpen}
    >
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-8xl mb-8 drop-shadow-2xl"
      >
        {content.icon}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
          Hey {name},
        </h2>
        <p className="text-zinc-300 text-sm font-medium">
          {content.text}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-8 py-3 rounded-full shadow-lg shadow-pink-500/30 animate-pulse"
      >
        TAP TO OPEN
      </motion.button>
    </div>
  );
};
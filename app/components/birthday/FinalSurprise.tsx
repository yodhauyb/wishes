'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig, EventType } from '../../types/birthday';
import { Sparkles, RotateCcw } from 'lucide-react';

interface FinalSurpriseProps {
  name: string;
  senderName: string;
  themeConfig: ThemeConfig;
  onReplay: () => void;
  slug: string;
  eventType?: EventType;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ 
  name, senderName, themeConfig, onReplay, eventType = 'birthday' 
}) => {

  const getFinalText = () => {
    switch (eventType) {
      case 'anniversary': return 'Happy Anniversary!';
      case 'rakshabandhan': return 'Happy Raksha Bandhan!';
      case 'valentines': return 'Happy Valentine\'s Day!';
      default: return 'Happy Birthday!';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-7xl mb-6"
      >
        ✨
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-4xl font-black ${themeConfig.textClass} mb-4 leading-tight drop-shadow-xl`}
      >
        {getFinalText()} <br/> {name}!
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 font-medium mb-12"
      >
        Hope you loved this little surprise made by <span className="font-bold text-white">{senderName}</span>.
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onReplay}
        className={`flex items-center gap-2 px-6 py-3 rounded-full ${themeConfig.primaryButtonClass} text-white font-bold text-sm shadow-lg active:scale-95 transition-transform`}
      >
        <RotateCcw size={16} /> Replay Experience
      </motion.button>
    </div>
  );
};
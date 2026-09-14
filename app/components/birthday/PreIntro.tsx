'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../types/birthday';

interface PreIntroProps {
  onNext: () => void;
  themeConfig: ThemeConfig;
}

export const PreIntro: React.FC<PreIntroProps> = ({ onNext, themeConfig }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const noTexts = [
    "No",
    "Are you sure? 🥺",
    "Think again! 😭",
    "Really? 💔",
    "Don't do this! 🙈",
    "Have a heart! 🧸",
    "I'm gonna cry... 💦",
    "Just click YES! 😡",
    "I'm ignoring you! 😤"
  ];

  // Emoji changes based on how many times they click 'No'
  const getMainEmoji = () => {
    if (noCount === 0) return "🎁";
    if (noCount < 3) return "🥺";
    if (noCount < 6) return "😭";
    return "💔";
  };

  // The Magic Dodging Logic
  const handleNoAction = () => {
    setNoCount((prev) => prev + 1);
    
    // Generates a random position between -120px and +120px
    const randomX = Math.floor(Math.random() * 240) - 120; 
    const randomY = Math.floor(Math.random() * 240) - 120; 
    
    setNoPos({ x: randomX, y: randomY });
  };

  const yesButtonScale = 1 + (noCount * 0.2); // Yes button grows!

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center relative overflow-hidden">
      
      {/* 🌸 Cute Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
         <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 left-8 text-3xl">✨</motion.div>
         <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-24 right-10 text-3xl">💖</motion.div>
         <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/3 right-8 text-2xl">🌸</motion.div>
      </div>

      {/* 🎁 Dynamic Center Emoji */}
      <motion.div
        key={getMainEmoji()} // Re-triggers animation when emoji changes
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="mb-8 z-10"
      >
        <div className={`w-32 h-32 rounded-full ${themeConfig.cardClass} flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-md`}>
          <span className="text-7xl drop-shadow-xl">{getMainEmoji()}</span>
        </div>
      </motion.div>

      {/* 💬 Desperate Text */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-2xl md:text-3xl font-black ${themeConfig.textClass} mb-12 drop-shadow-lg leading-snug z-10`}
      >
        {noCount === 0 ? (
          <>I have a special gift for you. <br/> Do you want to see it?</>
        ) : (
          <>Please say yes! <br/> Don't break my heart... 🥺</>
        )}
      </motion.h2>

      {/* 🔘 Buttons Container */}
      <div className="flex flex-row items-center justify-center gap-6 w-full relative z-20 min-h-[120px]">
        
        {/* THE YES BUTTON */}
        <motion.button
          animate={{ scale: yesButtonScale }}
          whileHover={{ scale: yesButtonScale + 0.05 }}
          whileTap={{ scale: yesButtonScale - 0.05 }}
          onClick={onNext}
          className={`px-8 py-4 rounded-full ${themeConfig.primaryButtonClass} font-black text-lg shadow-[0_0_25px_rgba(255,255,255,0.4)] z-30 flex items-center gap-2`}
          style={{ transformOrigin: 'center' }}
        >
          YES! 😍
        </motion.button>

        {/* THE NO BUTTON */}
        {noCount < 8 && (
          <motion.button
            animate={noCount === 0 ? { x: 0, y: 0 } : { x: noPos.x, y: noPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onMouseEnter={handleNoAction} // Destkop mouse dodge
            onClick={handleNoAction}     // Mobile tap dodge
            // If count is 0, it behaves like a normal flex item. If > 0, it breaks free and dodges!
            className={`px-6 py-3 rounded-full ${themeConfig.secondaryButtonClass} font-bold text-sm shadow-lg whitespace-nowrap transition-colors`}
            style={{ position: noCount === 0 ? 'relative' : 'absolute', zIndex: 10 }}
          >
            {noTexts[noCount]}
          </motion.button>
        )}
        
      </div>
    </div>
  );
};
'use client';
import { motion, type Variants , AnimatePresence  } from "framer-motion";
import React, { useState } from 'react';
import { ThemeConfig, EventType } from '../../types/birthday';

interface LetterSectionProps {
  letter: string;
  senderName: string;
  themeConfig: ThemeConfig;
  onNext: () => void;
  eventType?: EventType;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ 
  letter, senderName, themeConfig, onNext, eventType = 'birthday' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSealIcon = () => {
    switch (eventType) {
      case 'anniversary': return '💍';
      case 'rakshabandhan': return '🏵️';
      case 'valentines': return '💌';
      default: return '🎂';
    }
  };

  // 🪄 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 } // Dheere-dheere type hoga
    }
  };

  const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

  // 🧠 Smart Split: Spaces aur newlines ko preserve karne ke liye
  const tokens = letter.match(/\S+|\s+/g) || [];

  return (
    <div className="flex flex-col h-full p-6 justify-center items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // ENVELOPE (Bahar ka cover)
          <motion.div
            key="envelope"
            onClick={() => setIsOpen(true)}
            className={`w-full max-w-sm aspect-video ${themeConfig.cardClass} rounded-xl shadow-2xl relative cursor-pointer flex items-center justify-center border-2 border-white/20`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -10, transition: { duration: 0.4 } }}
          >
            <div className="absolute top-0 w-full h-1/2 border-b-2 border-white/20 bg-black/10 rounded-t-xl" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-2xl shadow-xl z-10 border-2 border-red-900"
            >
              {getSealIcon()}
            </motion.div>
            <p className="absolute bottom-4 text-xs font-bold text-white/70 uppercase tracking-widest">Tap to open</p>
          </motion.div>
        ) : (
          // REALISTIC OPEN LETTER WITH TYPEWRITER ANIMATION
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-full h-full max-h-[85%] relative perspective-1000 cursor-pointer"
            onClick={onNext}
          >
            {/* Paper Texture Background */}
            <div className="absolute inset-0 bg-[#F4F1EA] shadow-2xl rounded-sm overflow-hidden border border-[#D5CDBD]">
              
              {/* Subtle Paper Grain Pattern */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#c2b8a3_1px,transparent_1px)] [background-size:12px_12px]" />
              
              {/* Fold Crease Lines (Asli letter ki tarah) */}
              <div className="absolute top-1/3 w-full h-px bg-black/10 shadow-[0_1px_0_rgba(255,255,255,0.8)]" />
              <div className="absolute top-2/3 w-full h-px bg-black/10 shadow-[0_1px_0_rgba(255,255,255,0.8)]" />

              <div className="relative h-full overflow-y-auto p-8 scrollbar-none flex flex-col">
                {/* Internal Stamp */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-10 h-10 bg-red-700/10 rounded-full flex items-center justify-center border border-red-700/30">
                     <span className="text-xl opacity-80">{getSealIcon()}</span>
                  </div>
                </motion.div>
                
                {/* ✨ Typewriter Animated Text */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grow font-serif text-lg leading-[2.2] text-[#2C2825] whitespace-pre-wrap italic drop-shadow-sm"
                >
                  {tokens.map((token, index) => {
                    // Agar space ya enter (\n) hai, toh usko bina animate kiye waisa hi return kar do
                    if (/\s+/.test(token)) {
                      return token;
                    }
                    // Agar word hai, toh usko animate karo
                    return (
                      <motion.span key={index} variants={wordVariants} className="inline-block">
                        {token}
                      </motion.span>
                    );
                  })}
                </motion.div>

                {/* Signature Area */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (tokens.length * 0.08) + 0.5, duration: 1 }}
                  className="mt-10 pt-6 border-t border-[#D5CDBD]/50 text-right"
                >
                  <p className="text-sm text-[#2C2825]/60 mb-1 font-sans not-italic uppercase tracking-widest">Yours truly,</p>
                  <p className="font-serif text-3xl font-black text-[#2C2825]">{senderName}</p>
                </motion.div>

                <p className="text-[10px] text-[#2C2825]/40 font-bold uppercase text-center mt-12 animate-pulse font-sans not-italic">
                  Tap anywhere to continue
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
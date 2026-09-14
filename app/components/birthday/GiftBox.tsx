'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, ArrowRight, Heart } from 'lucide-react';
import { triggerConfetti } from './Confetti';
import { ThemeConfig } from '../../types/birthday';

interface GiftBoxProps {
  themeConfig: ThemeConfig;
  name: string;
  onNext: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({
  themeConfig,
  name,
  onNext
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsShaking(true);
    
    // short shake animation before opening
    setTimeout(() => {
      setIsShaking(false);
      setIsOpened(true);
      triggerConfetti('burst');
      // trigger side confetti for more festive look
      setTimeout(() => triggerConfetti('side'), 400);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-yellow-300 font-bold">One Final Thing</span>
          <h2 className="text-3xl font-black text-white">Your Birthday Gift! 🎁</h2>
          <p className="text-xs text-white/70 mt-1">Tap the present to unwrap it</p>
        </div>

        <div className="relative w-full min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* UNOPENED SHAKING GIFT */
              <motion.div
                key="unopened"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isShaking ? {
                  opacity: 1,
                  scale: 1,
                  rotate: [0, -10, 10, -10, 10, 0],
                  x: [0, -5, 5, -5, 5, 0]
                } : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0]
                }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={isShaking ? {
                  duration: 0.5,
                  ease: 'easeInOut'
                } : {
                  y: {
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut'
                  }
                }}
                onClick={handleOpen}
                className="cursor-pointer flex flex-col items-center justify-center group"
              >
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-3xl filter opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Big detailed gift package */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <span className="text-9xl filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.4)] select-none">🎁</span>
                  
                  {/* Hover Sparkle Badge */}
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-zinc-950 p-2 rounded-full shadow-lg font-bold text-xs flex items-center gap-1">
                    <Sparkles size={12} className="animate-spin" />
                    <span>TAP ME!</span>
                  </div>
                </div>

                <p className="text-sm font-bold text-pink-300 mt-4 tracking-wide uppercase group-hover:text-yellow-300 transition-colors">
                  Tap to Reveal the surprise
                </p>
              </motion.div>
            ) : (
              /* OPENED REVEAL CARD */
              <motion.div
                key="opened"
                initial={{ opacity: 0, scale: 0.6, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
                className="w-full bg-zinc-900/90 backdrop-blur-md p-8 rounded-3xl border border-yellow-500/30 text-white shadow-2xl relative overflow-hidden"
              >
                {/* Celebration Particles Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(234,179,8,0.1),transparent)] pointer-events-none" />

                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="p-4 bg-yellow-500/10 rounded-full border border-yellow-500/30 text-yellow-400"
                  >
                    <Trophy size={36} />
                  </motion.div>
                </div>

                <h3 className="text-2xl font-black text-yellow-300 mb-2">Surprise Unlocked! 🌟</h3>
                <h4 className="text-lg font-bold text-white mb-4">Congratulations, {name}!</h4>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-sm leading-relaxed text-zinc-200 text-left space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💝</span>
                    <p>
                      <strong>Gift Voucher:</strong> Unlimited love, lifetime friendship, and 100 free warm hugs redeemable immediately!
                    </p>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <span className="text-lg">🎟️</span>
                    <p>
                      <strong>Special Ticket:</strong> Valid for 1 x Awesome Dinner, Coffee, and Movie Night with the sender, fully sponsored! 🍿☕
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mb-6 italic">
                  Show this screen to the sender to redeem your gifts!
                </p>

                <motion.button
                  onClick={onNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold ${themeConfig.primaryButtonClass}`}
                >
                  <span>Go to Celebration Page</span>
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

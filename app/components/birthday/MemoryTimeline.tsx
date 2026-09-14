'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig, Memory } from '../../types/birthday';

interface MemoryTimelineProps {
  memories: Memory[];
  themeConfig: ThemeConfig;
  onNext: () => void;
}

export const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ memories, themeConfig, onNext }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none relative pb-20">
      
      {/* Sticky Header */}
      <div className={`sticky top-0 z-30 p-6 backdrop-blur-md bg-black/20 border-b border-white/10 text-center mb-8`}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl font-black ${themeConfig.textClass} tracking-wide drop-shadow-lg`}
        >
          OUR JOURNEY
        </motion.h2>
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">Scroll to relive</p>
      </div>

      <div className="px-6 relative">
        {/* Glowing Background Line */}
        <div className="absolute left-[39px] top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

        {memories.map((memory, index) => (
          <motion.div 
            key={memory.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: index * 0.1 }}
            className="relative flex gap-6 mb-12 group"
          >
            {/* Glowing Timeline Dot */}
            <div className="relative z-10 flex flex-col items-center mt-1">
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className={`w-4 h-4 rounded-full bg-white border-4 border-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.8)]`} 
              />
            </div>

            {/* Memory Content Card (Glassmorphism & Polaroid Mix) */}
            <div className={`flex-1 ${themeConfig.cardClass} p-5 rounded-3xl shadow-xl backdrop-blur-md border border-white/10 relative overflow-hidden`}>
              
              {/* Date Badge */}
              <div className="absolute top-0 right-0 bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl rounded-tr-3xl backdrop-blur-sm">
                {memory.date}
              </div>

              <h3 className={`text-xl font-bold ${themeConfig.textClass} mb-2 pr-12 drop-shadow-sm`}>
                {memory.title}
              </h3>
              
              <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">
                {memory.description}
              </p>

              {/* Polaroid Style Image */}
              {memory.photoUrl && (
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: -2 }}
                  className="bg-white p-2 pb-6 rounded-lg shadow-2xl transform rotate-1 mt-2"
                >
                  <img 
                    src={memory.photoUrl} 
                    alt={memory.title}
                    className="w-full h-40 object-cover rounded shadow-inner bg-zinc-200"
                  />
                  {/* Faux handwriting on polaroid */}
                  <p className="text-zinc-500 font-mono text-[10px] text-center mt-2 opacity-70">
                    ~ {memory.date}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="px-6 mt-8 flex justify-center pb-8">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={onNext}
          className={`flex items-center gap-2 px-8 py-3 rounded-full ${themeConfig.primaryButtonClass} text-white font-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 transition-all`}
        >
          Open Letter 💌
        </motion.button>
      </div>
      
    </div>
  );
};
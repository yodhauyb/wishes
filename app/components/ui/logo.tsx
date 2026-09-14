'use client';

import React from 'react';
import { Sparkles, Gift } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none hover:scale-105 transition-transform cursor-pointer">
      {/* 🎁 Glowing Icon Box */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 shadow-lg shadow-pink-500/40">
        <Gift className="text-white w-5 h-5" />
        <Sparkles className="absolute -top-1 -right-1 text-yellow-300 w-4 h-4 animate-pulse" />
      </div>
      
      {/* ✨ Aesthetic Brand Text */}
      <div className="flex flex-col justify-center">
        <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white leading-none">
          YODHAAI
        </span>
        <span className="text-[10px] font-bold text-pink-500 tracking-[0.2em] uppercase mt-0.5">
          Surprises
        </span>
      </div>
    </div>
  );
};
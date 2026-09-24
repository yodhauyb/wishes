'use client';

import React from 'react';
import { BirthdayForm } from '../components/creator/BirthdayForm';
import { Sparkles, ArrowLeft, Cloud } from 'lucide-react';
import Link from 'next/link';

// ✅ Logo sahi jagah import kiya
import { Logo } from '../components/ui/logo';

export default function CreateSurprisePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      
      {/* Decorative colored glow blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-400/10 dark:bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-indigo-400/10 dark:bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative z-10">
        
        {/* Top Header Row */}
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/60 dark:border-zinc-800/80">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-bold mb-5 transition-colors group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>
            
            {/* 🌟 WishMaker Logo (Yahan lagaya hai perfectly) */}
            <div className="mb-6">
              <Logo />
            </div>
            
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-100 flex items-center gap-2">
              <span>Personalized Surprise Studio</span>
              <Sparkles className="text-pink-500 animate-pulse" size={24} />
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm mt-2">
              Craft a premium, highly animated digital experience for your special person.
            </p>
          </div>

          {/* ✅ Status ab "Live on Cloud" ho gaya hai */}
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs px-4 py-2 rounded-2xl border border-emerald-500/20 shadow-xs mt-2 sm:mt-0">
            <Cloud size={16} />
            <span>Live on WishMaker Cloud</span>
          </div>
        </header>

        {/* Form and Preview Layout */}
        <main>
          <BirthdayForm />
        </main>
      </div>
    </div>
  );
}
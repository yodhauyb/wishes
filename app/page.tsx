'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Sparkles, Gift, Eye, ArrowRight } from 'lucide-react';

const EVENTS = [
  { id: 'birthday', name: 'Birthday', icon: '🎂', color: 'text-pink-500', bg: 'bg-pink-500', gradient: 'from-pink-500/20 to-transparent' },
  { id: 'anniversary', name: 'Anniversary', icon: '💍', color: 'text-rose-500', bg: 'bg-rose-500', gradient: 'from-rose-500/20 to-transparent' },
  { id: 'rakshabandhan', name: 'Rakhi', icon: '🏵️', color: 'text-orange-500', bg: 'bg-orange-500', gradient: 'from-orange-500/20 to-transparent' },
  { id: 'valentines', name: "Valentine's", icon: '🌹', color: 'text-red-500', bg: 'bg-red-500', gradient: 'from-red-500/20 to-transparent' }
];

export default function HomePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Cycle through events every 2.5 seconds for the hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % EVENTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const activeEvent = EVENTS[currentEventIndex];

  return (
    // FIX: 'overflow-hidden' hata kar 'overflow-x-hidden' kar diya taaki scroll ho sake!
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden font-sans scroll-smooth">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-black text-xl tracking-tight">
          <Gift className="text-pink-500" />
          <span>QR<span className="text-pink-500">SURPRISE</span></span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#demos" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
            View Demos
          </Link>
          <Link href="/create" className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-pink-500/25">
            Create Now →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Copy */}
        <div className="flex-1 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles size={14} />
            <span>The Viral Digital Surprise Platform</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6">
            Create a <br />
            <div className="h-[80px] lg:h-[100px] overflow-hidden relative inline-block w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeEvent.name}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                  className={`absolute left-0 ${activeEvent.color}`}
                >
                  {activeEvent.name}
                </motion.span>
              </AnimatePresence>
            </div>
            <br />
            They'll Never Forget <span className="inline-block animate-bounce">{activeEvent.icon}</span>
          </h1>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed">
            Craft premium, personalized digital experiences for your loved ones. Share them instantly with an elegant QR code and unlock magical memories.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/create" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-pink-500/20">
              <span>Create Your Surprise</span>
              <Gift size={18} />
            </Link>
            <Link href="#demos" className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all">
              <Eye size={18} />
              <span>Explore Demos</span>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-12 border-t border-zinc-900">
            <div>
              <p className="text-3xl font-black text-white">4+</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Premium Events</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Mobile-First</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">Instant</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">QR Generation</p>
            </div>
          </div>
        </div>

        {/* Right Phone Mockup Placeholder */}
        <div className="flex-1 relative w-full max-w-md perspective-1000 hidden md:block">
          <div className="relative aspect-[9/19] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 p-4 shadow-2xl overflow-hidden transform rotate-y-[-15deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-800 rounded-b-xl z-20"></div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 p-6 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEvent.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-7xl mb-6 drop-shadow-2xl">{activeEvent.icon}</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">
                      Happy {activeEvent.name}
                    </h3>
                    <p className="text-zinc-500 text-xs italic">
                      "A magical surprise awaits inside..."
                    </p>
                    <div className={`mt-8 px-6 py-2 rounded-full ${activeEvent.color.replace('text', 'bg').replace('500', '500/20')} ${activeEvent.color} text-xs font-bold uppercase tracking-wider animate-pulse`}>
                      Tap to Open
                    </div>
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </main>

      {/* NEW: Demos Section (Isi ki wajah se scroll aur links kaam karenge) */}
      <section id="demos" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Explore the Experiences</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Choose a template below to see exactly what your recipient will experience when they scan your surprise QR code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS.map((event) => (
              <div 
                key={event.id}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-hidden hover:border-zinc-700 transition-all duration-300"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 ${event.bg} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                    {event.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{event.name} Surprise</h3>
                  <p className="text-sm text-zinc-400 mb-8">
                    Beautifully crafted interactive journey perfect for celebrating {event.name.toLowerCase()}s.
                  </p>
                  
                  <Link href="/create" className={`flex items-center gap-2 text-sm font-bold ${event.color} hover:text-white transition-colors`}>
                    <span>Create This </span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
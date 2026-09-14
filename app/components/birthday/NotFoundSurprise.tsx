'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, HeartOff } from 'lucide-react';
import Link from 'next/link';

export const NotFoundSurprise: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-zinc-950 to-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md bg-zinc-900/80 backdrop-blur-md p-8 rounded-3xl border border-rose-500/20 shadow-2xl space-y-6 flex flex-col items-center"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="p-4 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20"
          >
            <HeartOff size={44} />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
            Oops! This surprise couldn't be found. 💔
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
            The birthday link may have expired, may be incorrect, or might be stored in a different browser.
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-xs text-zinc-400 text-left space-y-2 w-full">
          <p className="font-bold text-zinc-300">💡 Quick Troubleshooting:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check if the URL spelling matches exactly.</li>
            <li>If you created the surprise just now, make sure you are on the same device.</li>
            <li>Try accessing our default instant demo page: <Link href="/birthday/demo" className="text-pink-400 font-bold hover:underline">/birthday/demo</Link>.</li>
          </ul>
        </div>

        <div className="w-full">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/10 flex items-center justify-center gap-1.5 transition-all"
          >
            <Home size={14} />
            <span>Go Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

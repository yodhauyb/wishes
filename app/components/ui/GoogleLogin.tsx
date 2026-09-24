'use client';

import { motion } from 'framer-motion';
import { createClient } from '@/app/utils/supabase/client';
export const GoogleLogin = () => {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Login ke baad user ko wapas 'create' page par bhejenge
        redirectTo: `${window.location.origin}/create`, 
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Welcome to WishMaker ✨
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        Sign in securely to craft your magical digital experience.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-lg font-semibold border border-gray-200 transition-all hover:shadow-xl"
      >
        <img 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          alt="Google logo" 
          className="w-5 h-5" 
        />
        Continue with Google
      </motion.button>
    </div>
  );
};
// @ts-nocheck
'use client';

import React from 'react';
import { ThemeType } from '../../types/birthday';
import { THEME_CONFIGS } from '@/app/lib/themes';
import { CheckCircle } from 'lucide-react';

interface ThemeSelectorProps {
  selected: ThemeType;
  onChange: (theme: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selected, onChange }) => {
  const themes = Object.values(THEME_CONFIGS);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onChange(theme.id as ThemeType)}
          className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
            selected === theme.id 
              ? 'border-pink-500 bg-pink-500/10 shadow-md' 
              : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50'
          }`}
        >
          {/* Aesthetic Theme Preview Circle */}
          <div 
            className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white/20 shadow-sm"
            style={{ backgroundImage: `url(${theme.bgImage})` }}
          />
          
          <div className="flex-1">
            <h4 className={`text-sm font-bold ${selected === theme.id ? 'text-pink-600 dark:text-pink-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
              {theme.name}
            </h4>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 line-clamp-2">
              {theme.id === 'water' && 'Crystal clear water lilies with a cyan glow.'}
              {theme.id === 'vintage' && 'Warm nostalgic summer vibes with golden sunflowers.'}
              {theme.id === 'fairy' && 'Magical purple night sky with glowing fairy lights.'}
              {theme.id === 'anime' && 'Breezy Ghibli-style flower fields under a blue sky.'}
              {theme.id === 'tulips' && 'Golden hour shadows with tulips and butterflies.'}
              {theme.id === 'kawaii' && 'Cute pastel pink strawberry bear aesthetics.'}
              {theme.id === 'hearts' && 'Soft romantic rose-pink hearts floating.'}
              {theme.id === 'midnight' && 'Deep blue starry night with glowing moonlight.'}
            </p>
          </div>
          
          {selected === theme.id && (
            <CheckCircle className="text-pink-500 absolute top-4 right-4" size={20} />
          )}
        </button>
      ))}
    </div>
  );
};
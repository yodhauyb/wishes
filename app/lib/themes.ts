export type ThemeType = 'water' | 'vintage' | 'fairy' | 'anime' | 'tulips' | 'kawaii' | 'hearts' | 'midnight';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  bgImage: string;
  bgClass: string;
  cardBg: string;
  textPrimary: string;
  accent: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  water: {
    id: 'water',
    name: '💧 Crystal Water Lilies',
    bgImage: '/images/water-lilies.jpg',
    bgClass: 'bg-cyan-950 text-cyan-50',
    cardBg: 'bg-cyan-900/40 backdrop-blur-md border-cyan-500/30',
    textPrimary: 'text-cyan-100',
    accent: 'bg-cyan-500 text-white',
  },
  vintage: {
    id: 'vintage',
    name: '🌻 Vintage Summer',
    bgImage: '/images/vintage-summer.jpg',
    bgClass: 'bg-amber-950 text-amber-50',
    cardBg: 'bg-amber-900/40 backdrop-blur-md border-amber-500/30',
    textPrimary: 'text-amber-100',
    accent: 'bg-amber-600 text-white',
  },
  fairy: {
    id: 'fairy',
    name: '✨ Fairy Lights Night',
    bgImage: '/images/fairy-lights.jpg',
    bgClass: 'bg-purple-950 text-purple-50',
    cardBg: 'bg-purple-900/40 backdrop-blur-md border-purple-500/30',
    textPrimary: 'text-purple-100',
    accent: 'bg-purple-600 text-white',
  },
  anime: {
    id: 'anime',
    name: '⛅ Ghibli Flower Field',
    bgImage: '/images/anime-couple.jpg',
    bgClass: 'bg-sky-950 text-sky-50',
    cardBg: 'bg-sky-900/40 backdrop-blur-md border-sky-500/30',
    textPrimary: 'text-sky-100',
    accent: 'bg-sky-500 text-white',
  },
  tulips: {
    id: 'tulips',
    name: '🦋 Golden Tulips & Butterfly',
    bgImage: '/images/tulips-butterfly.jpg',
    bgClass: 'bg-stone-900 text-stone-100',
    cardBg: 'bg-stone-800/40 backdrop-blur-md border-stone-600/30',
    textPrimary: 'text-stone-100',
    accent: 'bg-amber-500 text-white',
  },
  kawaii: {
    id: 'kawaii',
    name: '🍓 Kawaii Strawberry Bear',
    bgImage: '/images/kawaii-bear.jpg',
    bgClass: 'bg-pink-950 text-pink-50',
    cardBg: 'bg-pink-900/40 backdrop-blur-md border-pink-500/30',
    textPrimary: 'text-pink-100',
    accent: 'bg-pink-500 text-white',
  },
  hearts: {
    id: 'hearts',
    name: '💖 Soft Aesthetic Hearts',
    bgImage: '/images/romantic-hearts.jpg',
    bgClass: 'bg-rose-950 text-rose-50',
    cardBg: 'bg-rose-900/40 backdrop-blur-md border-rose-500/30',
    textPrimary: 'text-rose-100',
    accent: 'bg-rose-500 text-white',
  },
  midnight: {
    id: 'midnight',
    name: '🌙 Midnight Starry Sky',
    bgImage: '/images/midnight-sky.jpg',
    bgClass: 'bg-blue-950 text-blue-50',
    cardBg: 'bg-blue-900/40 backdrop-blur-md border-blue-500/30',
    textPrimary: 'text-blue-100',
    accent: 'bg-blue-600 text-white',
  },
};
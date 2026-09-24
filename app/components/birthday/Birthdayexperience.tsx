// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BirthdayData } from '../../types/birthday';
import { THEME_CONFIGS } from '../../lib/themes';

import { MusicPlayer } from './MusicPlayer';
import { PreIntro } from './PreIntro';
import { BirthdayIntro } from './BirthdayIntro';
import { NameReveal } from './NameReveal';
import { BirthdayMessage } from './BirthdayMessage';
import { PhotoGallery } from './PhotoGallery';
import { MemoryTimeline } from './MemoryTimeline';
import { LetterSection } from './LetterSection';
import { GiftBox } from './GiftBox';
import { FinalSurprise } from './FinalSurprise';

interface BirthdayExperienceProps {
  data: BirthdayData;
}

export const BirthdayExperience: React.FC<BirthdayExperienceProps> = ({ data }) => {
  const [scene, setScene] = useState<number>(0);
  const themeConfig = THEME_CONFIGS[data.theme] || THEME_CONFIGS['water'];

  return (
    <main className={`relative w-full h-screen overflow-hidden flex flex-col justify-between ${themeConfig.bgClass}`}>
      
      {/* 🌟 ANIMATED BACKGROUND IMAGE CONTAINER */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.img 
          src={themeConfig.bgImage} 
          alt="Theme Background"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <MusicPlayer url={data.music || ''} isPlaying={scene > 0} />

      {/* Decorative Theme Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {data.theme === 'hearts' && <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-8xl">❤️</div>}
      </div>

      {/* Main Content Viewer (Maine yahan 'flex-grow' warning ko bhi 'grow' karke fix kar diya hai) */}
      <div className="grow relative z-10 flex flex-col justify-center max-w-md mx-auto w-full h-full">
        {scene === 0 && <PreIntro themeConfig={themeConfig} onNext={() => setScene(1)} />}
        {scene === 1 && <BirthdayIntro name={data.name} eventType={data.eventType} onOpen={() => setScene(2)} />}
        {scene === 2 && <NameReveal name={data.name} eventType={data.eventType} onNext={() => setScene(3)} />}
        {scene === 3 && <BirthdayMessage message={data.message} name={data.name} senderName={data.senderName} themeConfig={themeConfig} eventType={data.eventType} onNext={() => setScene(4)} />}
        {scene === 4 && <PhotoGallery photos={data.photos} themeConfig={themeConfig} onNext={() => setScene(5)} />}
        {scene === 5 && <MemoryTimeline memories={data.memories} themeConfig={themeConfig} onNext={() => setScene(6)} />}
        {scene === 6 && <LetterSection letter={data.letter} senderName={data.senderName} themeConfig={themeConfig} eventType={data.eventType} onNext={() => setScene(7)} />}
        {scene === 7 && <GiftBox themeConfig={themeConfig} name={data.name} onNext={() => setScene(8)} />}
        {scene === 8 && <FinalSurprise name={data.name} senderName={data.senderName} themeConfig={themeConfig} eventType={data.eventType} onReplay={() => setScene(0)} slug={data.slug} />}
      </div>

      {/* Bottom Branding */}
      <div className="py-3 text-center z-10">
        <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold">
          Made with ❤️ by WishMaker
        </span>
      </div>
    </main>
  );
};
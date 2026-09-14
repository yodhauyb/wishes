'use client';

import React, { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  url: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ url, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Agar URL nahi hai (yani 'No Music' chuna hai), toh kuch mat karo
    if (!url) return;

    if (isPlaying && audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Audio block hua:", e));
      }
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, url]);

  // Agar url hi khaali hai toh component render hi mat karo
  if (!url) return null;

  return (
    <audio ref={audioRef} src={url} loop className="hidden" />
  );
};
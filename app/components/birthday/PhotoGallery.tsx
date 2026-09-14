'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, ArrowRight } from 'lucide-react';
import { Photo, ThemeConfig } from '../../types/birthday';

interface PhotoGalleryProps {
  photos: Photo[];
  themeConfig: ThemeConfig;
  onNext: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  themeConfig,
  onNext
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center">
        <div className={`p-8 rounded-3xl ${themeConfig.cardClass} max-w-md`}>
          <Camera size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No photos uploaded yet</h3>
          <p className="text-sm opacity-80 mb-6">Create a dynamic photo gallery by uploading images in the creator dashboard!</p>
          <button onClick={onNext} className={`px-6 py-3 rounded-xl font-bold ${themeConfig.primaryButtonClass}`}>
            Continue to Timeline
          </button>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Gallery Title & Counter */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <div>
            <h3 className={`text-xl font-black tracking-wide text-white uppercase`}>
              Captured Moments 📸
            </h3>
            <p className="text-xs text-white/70">A beautiful snapshot of you</p>
          </div>
          <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Carousel Frame */}
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/10 flex items-center justify-center group">
          <AnimatePresence mode="wait">
            <motion.div
              key={photos[currentIndex].id}
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -50 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption || 'Birthday photo'}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="lazy"
              />
              
              {/* Image Dark Vignette overlay for caption readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Caption */}
              {photos[currentIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center pointer-events-none">
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base font-semibold md:text-lg drop-shadow-md italic"
                  >
                    "{photos[currentIndex].caption}"
                  </motion.p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2.5 rounded-full border border-white/10 active:scale-90 transition-all z-10 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-2.5 rounded-full border border-white/10 active:scale-90 transition-all z-10 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Swipe Hint */}
        <p className="text-xs text-white/50 mt-3 italic">
          Tip: Tap left or right arrows to explore all photos
        </p>

        {/* Next Scene Button */}
        <div className="mt-6 w-full">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold ${themeConfig.primaryButtonClass}`}
          >
            <span>Walk Down Memory Lane</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

      </div>
    </div>
  );
};

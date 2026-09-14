'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  active?: boolean;
  type?: 'burst' | 'continuous' | 'side';
}

export const triggerConfetti = (type: 'burst' | 'continuous' | 'side' = 'burst') => {
  if (typeof window === 'undefined') return;

  if (type === 'burst') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  } else if (type === 'side') {
    const end = Date.now() + 2 * 1000;

    // launch from sides
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } else if (type === 'continuous') {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 40 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
};

export const Confetti: React.FC<ConfettiProps> = ({ active = false, type = 'burst' }) => {
  useEffect(() => {
    if (active) {
      triggerConfetti(type);
    }
  }, [active, type]);

  return null;
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  colorClass = 'bg-indigo-600'
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`h-full ${colorClass}`}
      />
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-5 py-4 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 w-fit">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
        className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.15 }}
        className="w-2.5 h-2.5 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        className="w-2.5 h-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full"
      />
    </div>
  );
};

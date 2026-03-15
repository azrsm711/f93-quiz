import React from 'react';
import { motion } from 'motion/react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-[#313244] border border-[#45475a] rounded-2xl rounded-bl-none w-fit shadow-sm">
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        className="w-2 h-2 bg-[#89b4fa] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="w-2 h-2 bg-[#89b4fa] rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="w-2 h-2 bg-[#89b4fa] rounded-full"
      />
    </div>
  );
};

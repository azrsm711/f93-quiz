import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

export interface QCMOption {
  letter: string;
  text: string;
}

interface QCMOptionsProps {
  options: QCMOption[];
  question: string;
  onAnswer: (selectedOption: string) => void;
  isAnswered: boolean;
  correctAnswer?: string;
  explanation?: string;
  fontSize?: 'sm' | 'base' | 'lg';
}

const fontSizeClasses = {
  sm: 'text-xs',
  base: 'text-sm',
  lg: 'text-base'
};

export const QCMOptions: React.FC<QCMOptionsProps> = ({
  options,
  question,
  onAnswer,
  isAnswered,
  correctAnswer,
  explanation,
  fontSize = 'base'
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sizeClass = fontSizeClasses[fontSize];

  const handleOptionClick = async (letter: string) => {
    if (isAnswered || isAnimating) return;
    
    setIsAnimating(true);
    setSelectedOption(letter);
    
    // Small delay for click animation before showing result
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onAnswer(letter);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Unified QCM Card Container */}
      <div className="bg-[#181825] border border-[#313244] rounded-2xl overflow-hidden shadow-2xl">
        {/* Question Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#313244]/30 border-b border-[#313244] p-5"
        >
          <h3 className={`font-semibold text-[#cdd6f4] leading-relaxed ${sizeClass}`}>
            {question}
          </h3>
        </motion.div>

        {/* Options Section */}
        <div className="divide-y divide-[#313244]/50">
          {options.map((option, index) => (
            <motion.div
              key={option.letter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleOptionClick(option.letter)}
              className={`
                relative w-full p-4 font-medium transition-all duration-150 select-none
                flex items-center gap-4 cursor-pointer
                ${!isAnswered
                  ? 'bg-transparent hover:bg-[#313244] text-[#a6adc8] hover:text-[#cdd6f4]'
                  : option.letter === correctAnswer
                  ? 'bg-[#a6e3a1]/10 text-[#a6e3a1]'
                  : option.letter === selectedOption
                  ? 'bg-[#f38ba8]/10 text-[#f38ba8]'
                  : 'bg-transparent text-[#6c7086] opacity-50'
                }
              `}
              style={{ transitionDelay: isAnswered ? '0ms' : `${index * 80}ms` }}
            >
              {/* Letter Badge */}
              <motion.span
                className={`
                  shrink-0 w-8 h-8 rounded-lg flex items-center justify-center 
                  font-bold transition-all duration-300 border
                  ${!isAnswered
                    ? 'bg-[#313244] border-[#45475a] text-[#89b4fa]'
                    : option.letter === correctAnswer
                    ? 'bg-[#a6e3a1] border-[#a6e3a1] text-[#1e1e2e]'
                    : option.letter === selectedOption
                    ? 'bg-[#f38ba8] border-[#f38ba8] text-[#1e1e2e]'
                    : 'bg-[#313244] border-[#313244] text-[#6c7086]'
                  }
                `}
                whileHover={!isAnswered ? { scale: 1.1 } : {}}
                whileTap={!isAnswered ? { scale: 0.9 } : {}}
              >
                {option.letter}
              </motion.span>

              {/* Option Text */}
              <span className={`flex-1 leading-snug ${sizeClass}`}>
                {option.text}
              </span>

              {/* Status Icon */}
              {isAnswered && option.letter === correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="w-5 h-5 text-[#a6e3a1]" strokeWidth={3} />
                </motion.div>
              )}
              {isAnswered && option.letter === selectedOption && option.letter !== correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <X className="w-5 h-5 text-[#f38ba8]" strokeWidth={3} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explanation Panel */}
      <AnimatePresence>
        {isAnswered && explanation && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-4 p-5 bg-[#313244]/50 border border-[#45475a] rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#89b4fa]/20 border border-[#89b4fa]/30 rounded-full flex items-center justify-center">
                <span className="text-[#89b4fa] font-bold text-sm">i</span>
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-[#cdd6f4] mb-1 ${sizeClass}`}>Explication</h4>
                <p className={`${sizeClass} text-[#bac2de] leading-relaxed`}>{explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

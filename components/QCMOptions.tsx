import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRight } from 'lucide-react';

export interface QCMOption {
  letter: string;
  text: string;
}

interface QCMOptionsProps {
  options: QCMOption[];
  question: string;
  onAnswer: (selectedOption: string) => void;
  onNext: () => void;
  isAnswered: boolean;
  correctAnswer?: string;
  selectedAnswer?: string;
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
  onNext,
  isAnswered,
  correctAnswer,
  selectedAnswer,
  explanation,
  fontSize = 'base'
}) => {
  const sizeClass = fontSizeClasses[fontSize];

  const getOptionStyle = (letter: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-slate-200 hover:border-blue-400 cursor-pointer hover:scale-[1.02]';
    }
    
    if (letter === correctAnswer) {
      return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 ring-2 ring-green-500';
    }
    
    if (letter === selectedAnswer && letter !== correctAnswer) {
      return 'bg-gradient-to-r from-red-50 to-rose-50 border-red-500 ring-2 ring-red-500';
    }
    
    return 'bg-slate-50 border-slate-200 opacity-50';
  };

  const getBadgeStyle = (letter: string) => {
    if (!isAnswered) {
      return 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white';
    }
    
    if (letter === correctAnswer) {
      return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30';
    }
    
    if (letter === selectedAnswer && letter !== correctAnswer) {
      return 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30';
    }
    
    return 'bg-slate-300 text-slate-500';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* QCM Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden"
      >
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-6 ${isAnswered ? 'opacity-80' : ''}`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h3 className={`font-bold text-white leading-relaxed ${sizeClass}`}>
              {question}
            </h3>
          </div>
        </motion.div>

        {/* Options */}
        <div className="divide-y divide-slate-100">
          {options.map((option, index) => (
            <motion.div
              key={option.letter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => !isAnswered && onAnswer(option.letter)}
              className={`
                relative w-full p-5 transition-all duration-300 select-none
                flex items-center gap-4 group
                ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}
                ${getOptionStyle(option.letter)}
              `}
            >
              {/* Letter Badge */}
              <motion.span
                className={`
                  shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  font-bold text-lg transition-all duration-300 shadow-md
                  ${getBadgeStyle(option.letter)}
                `}
              >
                {option.letter}
              </motion.span>

              {/* Option Text */}
              <span className={`flex-1 font-medium leading-snug ${sizeClass} ${
                !isAnswered ? 'text-slate-700' :
                option.letter === correctAnswer ? 'text-green-800 font-semibold' :
                option.letter === selectedAnswer ? 'text-red-800 font-semibold' :
                'text-slate-400'
              }`}>
                {option.text}
              </span>

              {/* Status Icon */}
              {isAnswered && option.letter === correctAnswer && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-2 bg-green-500 rounded-xl"
                >
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </motion.div>
              )}
              {isAnswered && option.letter === selectedAnswer && option.letter !== correctAnswer && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-2 bg-red-500 rounded-xl"
                >
                  <X className="w-5 h-5 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Explanation & Next Button */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Result Banner */}
              <div className={`p-4 ${
                selectedAnswer === correctAnswer 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-red-500 to-rose-500'
              }`}>
                <div className="flex items-center gap-3 text-white">
                  {selectedAnswer === correctAnswer ? (
                    <>
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Check className="w-6 h-6" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Excellent !</p>
                        <p className="text-sm text-white/90">Bonne réponse</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-white/20 rounded-xl">
                        <X className="w-6 h-6" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Incorrect</p>
                        <p className="text-sm text-white/90">La bonne réponse était : {correctAnswer}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Explanation */}
              {explanation && (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">i</span>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-blue-900 mb-2 ${sizeClass}`}>
                        Explication
                      </h4>
                      <p className={`${sizeClass} text-slate-700 leading-relaxed`}>
                        {explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Button */}
              <div className="p-4 bg-slate-50 border-t">
                <button
                  onClick={onNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>Question Suivante</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

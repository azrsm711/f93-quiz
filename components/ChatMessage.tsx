import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Message, Sender } from '../types';

export interface ParsedQCM {
  question: string;
  options: { letter: string; text: string }[];
  isQCM: boolean;
}

interface ChatMessageProps {
  message: Message;
  fontSize?: 'sm' | 'base' | 'lg';
}

const fontSizeClasses = {
  sm: 'text-xs',
  base: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg'
};

const cleanText = (text: string): string => {
  return text
    .replace(/^\*\*\*+$/gm, '')
    .replace(/^\s*[\r\n]/gm, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const parseQCM = (text: string): ParsedQCM => {
  const lines = text.split('\n').filter(line => line.trim());
  const options: { letter: string; text: string }[] = [];
  let questionLines: string[] = [];
  let inOptions = false;

  for (const line of lines) {
    const optionMatch = line.trim().match(/^([A-D])\)\s*(.+)$/);
    if (optionMatch) {
      inOptions = true;
      options.push({ letter: optionMatch[1], text: optionMatch[2] });
    } else if (!inOptions) {
      questionLines.push(line);
    }
  }

  const isQCM = options.length === 4;
  const question = questionLines.join(' ').trim();

  return { question, options, isQCM };
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, fontSize = 'base' }) => {
  const isBot = message.sender === Sender.Bot;
  const sizeClass = fontSizeClasses[fontSize];
  const cleanedText = isBot ? cleanText(message.text) : message.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-3xl shadow-lg leading-relaxed ${sizeClass} ${
          isBot
            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-md'
            : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white rounded-tr-md shadow-xl shadow-blue-500/30'
        }`}
      >
        <div className="markdown-content">
          <ReactMarkdown
             components={{
                p: ({...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                ul: ({...props}) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1 leading-relaxed" {...props} />,
                ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1 leading-relaxed" {...props} />,
                li: ({...props}) => <li className="my-1 leading-relaxed" {...props} />,
                strong: ({...props}) => <strong className="font-bold" {...props} />,
                em: ({...props}) => <em className="italic" {...props} />,
                h1: ({...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
                h2: ({...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
                h3: ({...props}) => <h3 className="text-sm font-bold mb-2" {...props} />,
                blockquote: ({...props}) => (
                  <blockquote className="border-l-4 border-blue-400 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 pl-4 pr-3 py-2 my-2 rounded-r-xl text-slate-700 dark:text-slate-200" {...props} />
                ),
             }}
          >
            {cleanedText}
          </ReactMarkdown>
        </div>
        <div
          className={`text-[10px] mt-2 pt-2 border-t ${
            isBot 
              ? 'border-slate-200/50 dark:border-slate-700/50 text-slate-400 dark:text-slate-500' 
              : 'border-white/20 text-white/70'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

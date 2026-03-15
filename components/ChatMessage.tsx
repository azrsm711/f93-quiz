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

// Clean markdown text by removing stray separators and normalizing
const cleanText = (text: string): string => {
  return text
    .replace(/^\*\*\*+$/gm, '') // Remove *** separator lines
    .replace(/^\s*[\r\n]/gm, '\n') // Remove multiple blank lines
    .replace(/\n{3,}/g, '\n\n') // Normalize to max 2 line breaks
    .trim();
};

// Parse bot message to extract QCM question and options
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

  // Valid QCM must have exactly 4 options
  const isQCM = options.length === 4;
  let question = questionLines.join(' ').trim();
  
  // Clean up if the question string accidentally contains the feedback from the previous answer
  const qIndex = question.search(/Question\s*:/i);
  if (qIndex > -1) {
    question = question.substring(qIndex).replace(/Question\s*:/i, '').trim();
  }

  return { question, options, isQCM };
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, fontSize = 'base' }) => {
  const isBot = message.sender === Sender.Bot;
  const sizeClass = fontSizeClasses[fontSize];
  const cleanedText = isBot ? cleanText(message.text) : message.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-5 py-3 rounded-2xl shadow-sm leading-relaxed ${sizeClass} ${
          isBot
            ? 'bg-[#313244] border border-[#45475a] text-[#cdd6f4] rounded-bl-none'
            : 'bg-[#89b4fa] text-[#1e1e2e] rounded-br-none shadow-md shadow-[#89b4fa]/10 font-medium'
        }`}
      >
        <div className="markdown-content">
          <ReactMarkdown
             components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1 leading-relaxed" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1 leading-relaxed" {...props} />,
                li: ({node, ...props}) => <li className="my-1 leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className={`font-bold ${isBot ? 'text-[#f5e0dc]' : 'text-[#1e1e2e]'}`} {...props} />,
                em: ({node, ...props}) => <em className="italic opacity-80" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-lg font-black mb-2 tracking-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 tracking-tight" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2 tracking-tight" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-[#b4befe] bg-[#1e1e2e]/30 pl-4 pr-3 py-2 my-2 rounded-r-lg text-[#bac2de]" {...props} />
                ),
             }}
          >
            {cleanedText}
          </ReactMarkdown>
        </div>
        <div
          className={`text-[10px] mt-1 opacity-60 ${
            isBot ? 'text-[#6c7086]' : 'text-[#1e1e2e]/50'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

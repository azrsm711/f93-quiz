import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, Sender, Topic, DifficultyLevel, QuizMode } from './types';
import { startQuizSession, sendAnswer, prefetchNextQuestion } from './services/geminiService';
import { ChatMessage, parseQCM } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { QCMOptions } from './components/QCMOptions';
import { TOPICS } from './constants';
import { Plus, Send, ArrowLeft, RotateCcw, Trophy, Target, Zap, BookOpen, CheckSquare, Heart, Activity, Stethoscope, Syringe, ClipboardList, Bandage, Wind, Droplet, Pill, Thermometer, Hospital, ZoomIn, ZoomOut } from 'lucide-react';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermediaire');
  const [selectedMode, setSelectedMode] = useState<QuizMode>('chat');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [questionCount, setQuestionCount] = useState(0);
  const [targetQuestions, setTargetQuestions] = useState(20);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // QCM-specific state
  const [currentQCM, setCurrentQCM] = useState<{
    question: string;
    options: { letter: string; text: string }[];
    isAnswered: boolean;
    correctAnswer?: string;
    explanation?: string;
  } | null>(null);

  // Track which message indices contain QCM questions (to hide duplicates)
  const [qcmMessageIndices, setQcmMessageIndices] = useState<number[]>([]);

  // Prefetch state for background question generation
  const [prefetchedQuestion, setPrefetchedQuestion] = useState<string | null>(null);
  const [isPrefetching, setIsPrefetching] = useState(false);

  // Topic-specific icons for nursing/health themes
  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'cardio': return <Heart className="w-4 h-4 text-current" />;
      case 'diabete': return <Droplet className="w-4 h-4 text-current" />;
      case 'mpoc': return <Wind className="w-4 h-4 text-current" />;
      case 'soins-operatoires': return <ClipboardList className="w-4 h-4 text-current" />;
      case 'dav': return <Syringe className="w-4 h-4 text-current" />;
      default: return <Stethoscope className="w-4 h-4 text-current" />;
    }
  };

  const getTopicLargeIcon = (topicId: string) => {
    switch (topicId) {
      case 'cardio': return <Heart className="w-12 h-12 text-current" />;
      case 'diabete': return <Droplet className="w-12 h-12 text-current" />;
      case 'mpoc': return <Wind className="w-12 h-12 text-current" />;
      case 'soins-operatoires': return <ClipboardList className="w-12 h-12 text-current" />;
      case 'dav': return <Syringe className="w-12 h-12 text-current" />;
      default: return <Stethoscope className="w-12 h-12 text-current" />;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentTopic) {
      scrollToBottom();
    }
  }, [messages, isLoading, currentTopic]);

  const triggerPrefetch = useCallback(async (lastBotMessage: string) => {
    if (!currentTopic || isPrefetching || prefetchedQuestion) return;
    setIsPrefetching(true);
    try {
      const next = await prefetchNextQuestion(currentTopic.content, selectedDifficulty, selectedMode, lastBotMessage);
      if (next && next.trim()) setPrefetchedQuestion(next.trim());
    } catch (error) {
      console.error('Prefetch failed:', error);
      setPrefetchedQuestion(null);
    } finally {
      setIsPrefetching(false);
    }
  }, [currentTopic, selectedDifficulty, selectedMode, isPrefetching, prefetchedQuestion]);

  const initQuiz = async (topic: Topic, difficulty: DifficultyLevel = selectedDifficulty, mode: QuizMode = selectedMode) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    setMessages([]);
    setCurrentQCM(null);
    setQcmMessageIndices([]);
    setPrefetchedQuestion(null);
    setIsPrefetching(false);
    setQuestionCount(1);

    try {
      const text = await startQuizSession(topic.content, difficulty, mode);
      const initialMessage: Message = { id: Date.now().toString(), text, sender: Sender.Bot, timestamp: new Date() };
      if (mode === 'qcm') {
        const parsed = parseQCM(text);
        if (parsed.isQCM) {
          setMessages([initialMessage]);
          setQcmMessageIndices([0]);
          setCurrentQCM({ question: parsed.question, options: parsed.options, isAnswered: false });
          triggerPrefetch(text);
        } else {
          setMessages([initialMessage]);
        }
      } else {
        setMessages([initialMessage]);
        triggerPrefetch(text);
      }
    } catch (error: any) {
      console.error("Failed to start quiz", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: `Désolé, impossible de démarrer le quiz. Erreur: ${error.message || 'Inconnue'}`,
        sender: Sender.System,
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic: Topic) => initQuiz(topic);

  const handleCustomTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;
    const customTopic: Topic = {
      id: 'custom',
      title: 'Sujet Personnalisé',
      description: customTopicInput.trim(),
      content: `L'utilisateur souhaite être interrogé sur le sujet suivant : ${customTopicInput.trim()}.`
    };
    initQuiz(customTopic);
    setCustomTopicInput('');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: Sender.User, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    try {
      const responseText = await sendAnswer(userMsg.text);
      const nextCount = questionCount + 1;
      if (messages.length > 0) setQuestionCount(nextCount);
      
      if (nextCount > targetQuestions) {
        setShowCompletionDialog(true);
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: Sender.Bot, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
      if (selectedMode === 'qcm') {
        const parsed = parseQCM(responseText);
        if (parsed.isQCM) setCurrentQCM({ question: parsed.question, options: parsed.options, isAnswered: false });
      }
      triggerPrefetch(responseText);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Erreur de communication.", sender: Sender.System, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleQCMAnswer = async (selectedOption: string) => {
    if (!currentQCM || currentQCM.isAnswered) return;
    setCurrentQCM(prev => prev ? { ...prev, isAnswered: true } : null);
    setIsLoading(true);
    try {
      const responseText = await sendAnswer(selectedOption);
      const isCorrect = responseText.toLowerCase().includes('correct');
      const correctAnswer = currentQCM.options.find(opt => responseText.toLowerCase().includes(opt.letter.toLowerCase()) && responseText.toLowerCase().includes('correct'))?.letter;
      let explanation = responseText;
      const qMatchIndex = responseText.search(/Question\s*:/i);
      explanation = qMatchIndex > -1 ? responseText.substring(0, qMatchIndex).trim() : responseText.split('\n\n')[0].trim();
      setCurrentQCM(prev => prev ? { ...prev, isAnswered: true, correctAnswer: correctAnswer || currentQCM.options[0].letter, explanation: `${isCorrect ? '✨ Correct !' : '❌ Incorrect.'} ${explanation}` } : null);
      const nextParsed = parseQCM(responseText);
      const selectedOptionObj = currentQCM.options.find(opt => opt.letter === selectedOption);
      const formattedHistoryMsg = `**Question :** ${currentQCM.question}\n\n**Votre choix :** ${selectedOption}) ${selectedOptionObj ? selectedOptionObj.text : ''}\n\n**Résultat :** ${isCorrect ? '✨ Correct !' : '❌ Incorrect.'} ${explanation}`;
      const historyMsg: Message = { id: Date.now().toString() + '_history', text: formattedHistoryMsg, sender: Sender.Bot, timestamp: new Date() };
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: Sender.Bot, timestamp: new Date() };
      setMessages((prev) => {
        const newMessages = [...prev, historyMsg, botMsg];
        const newIndex = newMessages.length - 1;
        if (nextParsed.isQCM) {
          setQcmMessageIndices(prevIndices => [...prevIndices, newIndex]);
          const nextCount = questionCount + 1;
          setQuestionCount(nextCount);

          if (nextCount > targetQuestions) {
            setShowCompletionDialog(true);
          }

          if (prefetchedQuestion && prefetchedQuestion.trim()) {
            const prefetchedParsed = parseQCM(prefetchedQuestion);
            setTimeout(() => {
              setCurrentQCM({ question: prefetchedParsed.question, options: prefetchedParsed.options, isAnswered: false });
              setPrefetchedQuestion(null);
              triggerPrefetch(prefetchedParsed.question);
            }, 100);
          } else {
            setTimeout(() => {
              setCurrentQCM({ question: nextParsed.question, options: nextParsed.options, isAnswered: false });
              triggerPrefetch(nextParsed.question);
            }, 100);
          }
        } else {
          setTimeout(() => setCurrentQCM(null), 100);
        }
        return newMessages;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = async () => {
    if (currentTopic) {
      setQcmMessageIndices([]); setPrefetchedQuestion(null); setIsPrefetching(false); 
      setQuestionCount(0); setTargetQuestions(20); setShowCompletionDialog(false);
      await initQuiz(currentTopic, selectedDifficulty, selectedMode);
    }
  };

  const handleBackToMenu = () => {
    setCurrentTopic(null); setCurrentQCM(null); setQcmMessageIndices([]); setMessages([]); 
    setInputText(''); setPrefetchedQuestion(null); setIsPrefetching(false); 
    setQuestionCount(0); setTargetQuestions(20); setShowCompletionDialog(false);
  };

  if (!currentTopic) {
    return (
      <div className="flex flex-col h-screen bg-[#1e1e2e] font-sans antialiased text-[#cdd6f4]">
        <header className="py-16 px-6 flex flex-col items-center justify-center relative">
          <motion.div 
            className="p-5 bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] rounded-3xl relative z-10 shadow-[0_0_30px_rgba(203,166,247,0.3)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Stethoscope className="w-14 h-14 text-[#1e1e2e]" />
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#cba6f7]/20 blur-3xl -z-10 translate-x-[-25%] translate-y-[-25%]" />
          </motion.div>
          <h1 className="mt-10 text-6xl font-black tracking-tighter uppercase bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] bg-clip-text text-transparent drop-shadow-sm">
            F93 Quiz
          </h1>
          <p className="mt-4 text-[#a6adc8] text-sm font-medium uppercase tracking-[0.3em] opacity-80">Nursing Excellence • v2.4.2</p>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-16">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="bg-[#181825] border border-[#313244] rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10 shadow-xl">
              <div>
                <h2 className="text-[#a6adc8] text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#cba6f7]" /> Niveau de Difficulté
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(['debutant', 'intermediaire', 'avance'] as DifficultyLevel[]).map((d) => (
                    <button
                      key={d} onClick={() => setSelectedDifficulty(d)}
                      className={`rounded-2xl px-6 py-3 text-xs font-bold transition-all duration-200 border-2 ${
                        selectedDifficulty === d 
                        ? d === 'debutant' ? 'bg-[#a6e3a1]/10 border-[#a6e3a1] text-[#a6e3a1]' :
                          d === 'intermediaire' ? 'bg-[#89b4fa]/10 border-[#89b4fa] text-[#89b4fa]' :
                          'bg-[#cba6f7]/10 border-[#cba6f7] text-[#cba6f7]'
                        : 'bg-[#313244]/50 border-transparent text-[#6c7086] hover:text-[#a6adc8] hover:bg-[#313244]'
                      }`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[#a6adc8] text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#89b4fa]" /> Mode de Révision
                </h2>
                <div className="flex gap-3">
                  {(['chat', 'qcm'] as QuizMode[]).map((m) => (
                    <button
                      key={m} onClick={() => setSelectedMode(m)}
                      className={`flex-1 rounded-2xl px-6 py-3 text-xs font-bold transition-all duration-200 border-2 ${
                        selectedMode === m 
                        ? 'bg-[#89b4fa]/10 border-[#89b4fa] text-[#89b4fa]' 
                        : 'bg-[#313244]/50 border-transparent text-[#6c7086] hover:text-[#a6adc8] hover:bg-[#313244]'
                      }`}
                    >
                      {m === 'chat' ? 'Conversation' : 'Mode QCM'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id} onClick={() => handleTopicSelect(topic)}
                  className="bg-[#181825] border border-[#313244] hover:border-[#cba6f7]/50 rounded-3xl p-6 text-left transition-all duration-300 hover:translate-y-[-4px] shadow-lg group"
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-[#cba6f7]/10 rounded-2xl p-4 text-[#cba6f7] group-hover:bg-[#cba6f7]/20 transition-colors">
                      {React.cloneElement(getTopicIcon(topic.id) as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg leading-tight mb-1">{topic.title}</h3>
                      <p className="text-[#a6adc8] text-xs font-medium line-clamp-1 opacity-70">{topic.description}</p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="bg-[#181825] border-2 border-dashed border-[#313244] rounded-3xl p-6 flex flex-col transition-all duration-300 hover:border-[#89b4fa]/40">
                <div className="flex items-center gap-5 mb-6">
                  <div className="bg-[#89b4fa]/10 rounded-2xl p-4"><Plus className="w-6 h-6 text-[#89b4fa]" /></div>
                  <h3 className="text-white font-bold text-lg">Sujet libre</h3>
                </div>
                <form onSubmit={handleCustomTopicSubmit} className="mt-auto space-y-4">
                  <textarea
                    value={customTopicInput} onChange={(e) => setCustomTopicInput(e.target.value)}
                    placeholder="Ex: Pharmacologie, Anatomie, Soins critiques..."
                    className="w-full bg-[#313244]/30 border border-[#313244] rounded-2xl px-5 py-4 text-sm text-[#cdd6f4] placeholder:text-[#6c7086] focus:outline-none focus:ring-2 focus:ring-[#89b4fa]/50 focus:bg-[#313244]/50 min-h-[100px] resize-none transition-all"
                  />
                  <button type="submit" disabled={!customTopicInput.trim()} className="w-full bg-[#cba6f7] hover:bg-[#b48ead] disabled:opacity-30 disabled:grayscale text-[#1e1e2e] font-black py-4 rounded-2xl transition-all text-[10px] uppercase tracking-[0.2em]">
                    Générer le Quiz
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const progress = Math.min((questionCount / targetQuestions) * 100, 100);

  return (
    <div className="flex flex-col h-screen bg-[#1e1e2e] font-sans antialiased text-[#cdd6f4]">
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 overflow-hidden">
        <div className="bg-[#1e1e2e] flex flex-col h-full overflow-hidden rounded-[2rem] border border-[#313244] shadow-2xl relative">
          
          <AnimatePresence>
            {showCompletionDialog && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#11111b]/80 backdrop-blur-sm p-6"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                  className="bg-[#181825] border border-[#313244] rounded-[2rem] p-8 max-w-md w-full shadow-2xl text-center"
                >
                  <div className="bg-[#a6e3a1]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-[#a6e3a1]" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-2">Quiz Terminé !</h2>
                  <p className="text-[#a6adc8] mb-8 text-sm leading-relaxed">
                    Félicitations, vous avez complété les {targetQuestions} questions prévues pour cette session. 
                    Que souhaitez-vous faire maintenant ?
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        setTargetQuestions(prev => prev + 10);
                        setShowCompletionDialog(false);
                      }}
                      className="w-full bg-[#cba6f7] hover:bg-[#b48ead] text-[#1e1e2e] font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs"
                    >
                      Continuer (10 questions de plus)
                    </button>
                    <button 
                      onClick={handleBackToMenu}
                      className="w-full bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs border border-[#45475a]"
                    >
                      Changer de sujet
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full h-1.5 bg-[#11111b] relative z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] rounded-full shadow-[0_0_15px_rgba(203,166,247,0.4)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>

          <header className="bg-[#181825]/80 backdrop-blur-md border-b border-[#313244] p-5 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
              <button onClick={handleBackToMenu} className="bg-[#313244]/50 hover:bg-[#313244] border border-[#45475a] rounded-xl p-2.5 text-[#a6adc8] hover:text-[#cba6f7] transition-all">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-[#cba6f7]/10 rounded-xl p-2.5 text-[#cba6f7]">{getTopicIcon(currentTopic.id)}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-white font-bold text-base leading-none">{currentTopic.title}</h1>
                    <span className="text-[#6c7086] text-[10px] font-black uppercase tracking-widest bg-[#11111b] px-2 py-1 rounded-md">
                      {questionCount} / {targetQuestions}
                    </span>
                    {questionCount >= targetQuestions && (
                      <span className="text-[#a6e3a1] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-[#a6e3a1]/10 px-2 py-1 rounded-md">
                        <Trophy className="w-3 h-3" /> Terminé!
                      </span>
                    )}
                  </div>
                  <p className="text-[#a6adc8] text-[10px] font-bold uppercase tracking-[0.15em] mt-1.5 opacity-60">
                    {selectedMode === 'qcm' ? '📋 Mode QCM' : '💬 Conversation'} • {selectedDifficulty}
                  </p>
                </div>
                {isPrefetching && (
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-[#a6e3a1] shadow-[0_0_8px_rgba(166,227,161,0.6)]" 
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#11111b] border border-[#313244] rounded-xl p-1">
                <button onClick={() => setFontSize('sm')} className={`p-2 rounded-lg transition-all ${fontSize === 'sm' ? 'bg-[#313244] text-[#cba6f7]' : 'text-[#6c7086] hover:text-[#a6adc8]'}`}><ZoomOut className="w-4 h-4" /></button>
                <button onClick={() => setFontSize('lg')} className={`p-2 rounded-lg transition-all ${fontSize === 'lg' ? 'bg-[#313244] text-[#cba6f7]' : 'text-[#6c7086] hover:text-[#a6adc8]'}`}><ZoomIn className="w-4 h-4" /></button>
              </div>
              <button onClick={handleRestart} className="bg-[#313244]/50 hover:bg-[#313244] border border-[#45475a] rounded-xl p-2.5 text-[#a6adc8] hover:text-[#cba6f7] transition-all" title="Recommencer">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-[#1e1e2e]">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg, index) => (selectedMode === 'qcm' && qcmMessageIndices.includes(index) ? null : <ChatMessage key={msg.id} message={msg} fontSize={fontSize} />))}
            </div>
            {selectedMode === 'qcm' && currentQCM && (
              <div className="mt-10 mb-6 max-w-4xl mx-auto">
                <QCMOptions
                  key={currentQCM.question} question={currentQCM.question} options={currentQCM.options}
                  onAnswer={handleQCMAnswer} isAnswered={currentQCM.isAnswered}
                  correctAnswer={currentQCM.correctAnswer} explanation={currentQCM.explanation} fontSize={fontSize}
                />
              </div>
            )}
            {isLoading && <div className="flex justify-start w-full mt-6 max-w-4xl mx-auto"><TypingIndicator /></div>}
            <div ref={messagesEndRef} className="h-4" />
          </main>

          {selectedMode === 'chat' && (
            <footer className="p-6 bg-[#181825] border-t border-[#313244]">
              <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-4">
                <div className="flex-1 bg-[#11111b] border border-[#313244] rounded-2xl px-5 py-4 flex gap-3 items-center focus-within:border-[#cba6f7]/50 transition-all shadow-inner">
                  <input
                    ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                    placeholder="Tapez votre réponse ici..." disabled={isLoading}
                    className="bg-transparent text-[#cdd6f4] placeholder:text-[#6c7086] outline-none flex-1 text-sm font-medium"
                  />
                </div>
                <button
                  type="submit" disabled={!inputText.trim() || isLoading}
                  className="bg-[#cba6f7] hover:bg-[#b48ead] shadow-lg shadow-[#cba6f7]/20 rounded-2xl px-8 text-[#1e1e2e] transition-all duration-200 disabled:opacity-30 disabled:grayscale flex items-center justify-center group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

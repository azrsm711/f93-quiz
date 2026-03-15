import React, { useState, useEffect, useRef } from 'react';
import { Message, Sender, Topic, DifficultyLevel, QuizMode } from './types';
import { startQuizSession, sendAnswer } from './services/geminiService';
import { ChatMessage, parseQCM } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { QCMOptions } from './components/QCMOptions';
import { TOPICS } from './constants';
import { toast } from 'sonner';
import {
  Plus, Send, ArrowLeft, RotateCcw, Trophy, Target, Zap, BookOpen, CheckSquare,
  Heart, Activity, Stethoscope, Syringe, ClipboardList, Wind, Droplet,
  ZoomIn, ZoomOut, Moon, Sun, Sparkles, Brain, GraduationCap
} from 'lucide-react';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermediaire');
  const [selectedMode, setSelectedMode] = useState<QuizMode>('chat');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentQCM, setCurrentQCM] = useState<{
    question: string;
    options: { letter: string; text: string }[];
    isAnswered: boolean;
    correctAnswer?: string;
    selectedAnswer?: string;
    explanation?: string;
    nextQuestion?: string;
    nextOptions?: { letter: string; text: string }[];
  } | null>(null);
  const [qcmMessageIndices, setQcmMessageIndices] = useState<number[]>([]);

  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'cardio': return <Heart className="w-5 h-5" />;
      case 'diabete': return <Droplet className="w-5 h-5" />;
      case 'mpoc': return <Wind className="w-5 h-5" />;
      case 'soins-operatoires': return <ClipboardList className="w-5 h-5" />;
      case 'dav': return <Syringe className="w-5 h-5" />;
      default: return <Stethoscope className="w-5 h-5" />;
    }
  };

  const getTopicGradient = (topicId: string) => {
    switch (topicId) {
      case 'cardio': return 'from-rose-500 to-pink-600';
      case 'diabete': return 'from-blue-400 to-cyan-500';
      case 'mpoc': return 'from-teal-400 to-emerald-500';
      case 'soins-operatoires': return 'from-violet-500 to-purple-600';
      case 'dav': return 'from-amber-400 to-orange-500';
      default: return 'from-blue-500 to-indigo-600';
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

  const initQuiz = async (topic: Topic, difficulty: DifficultyLevel = selectedDifficulty, mode: QuizMode = selectedMode) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    setMessages([]);
    setCurrentQCM(null);
    setQcmMessageIndices([]);

    try {
      const text = await startQuizSession(topic.content, difficulty, mode);
      const initialMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: Sender.Bot,
        timestamp: new Date(),
      };

      if (mode === 'qcm') {
        const parsed = parseQCM(text);
        if (parsed.isQCM) {
          setMessages([initialMessage]);
          setQcmMessageIndices([0]);
          setCurrentQCM({
            question: parsed.question,
            options: parsed.options,
            isAnswered: false,
          });
        } else {
          setMessages([initialMessage]);
        }
      } else {
        setMessages([initialMessage]);
      }
      toast.success('Quiz démarré !', {
        description: `${topic.title} • ${difficulty}`,
      });
    } catch {
      toast.error('Échec du démarrage', {
        description: 'Vérifiez votre connexion',
      });
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Désolé, impossible de démarrer le quiz.",
        sender: Sender.System,
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    initQuiz(topic);
  };

  const handleCustomTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;

    const customTopic: Topic = {
      id: 'custom',
      title: 'Sujet Personnalisé',
      description: customTopicInput.trim(),
      content: `Sujet personnalisé : ${customTopicInput.trim()}`
    };

    initQuiz(customTopic);
    setCustomTopicInput('');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: Sender.User,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendAnswer(userMsg.text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.Bot,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);

      if (selectedMode === 'qcm') {
        const parsed = parseQCM(responseText);
        if (parsed.isQCM) {
          setCurrentQCM({
            question: parsed.question,
            options: parsed.options,
            isAnswered: false,
          });
        }
      }
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Une erreur est survenue.",
        sender: Sender.System,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleQCMAnswer = async (selectedOption: string) => {
    if (!currentQCM || currentQCM.isAnswered) return;

    setIsLoading(true);

    try {
      const responseText = await sendAnswer(selectedOption);

      const correctAnswer = currentQCM.options.find(opt =>
        responseText.toLowerCase().includes(opt.letter.toLowerCase()) &&
        responseText.toLowerCase().includes('correct')
      )?.letter;

      const explanationMatch = responseText.match(/(?:correct|incorrect)[.!].*?(.+)/is);
      const explanation = explanationMatch ? explanationMatch[1].trim() : responseText;

      // Update QCM with answer immediately (don't wait for message)
      setCurrentQCM(prev => prev ? {
        ...prev,
        isAnswered: true,
        selectedAnswer: selectedOption,
        correctAnswer: correctAnswer || currentQCM.options[0].letter,
        explanation
      } : null);

      // Add bot response to messages for history
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.Bot,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMsg];
        const newIndex = newMessages.length - 1;

        // Parse next QCM but don't show it yet - wait for Next button
        const nextParsed = parseQCM(responseText);
        if (nextParsed.isQCM) {
          setQcmMessageIndices(prevIndices => [...prevIndices, newIndex]);
          // Store next question data for when user clicks Next
          setTimeout(() => {
            setCurrentQCM(prev => prev ? {
              ...prev,
              nextQuestion: nextParsed.question,
              nextOptions: nextParsed.options
            } : null);
          }, 100);
        }
        
        return newMessages;
      });
    } catch (error) {
      console.error("Error processing QCM answer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (!currentQCM) return;
    
    // Load next question if available
    if (currentQCM.nextQuestion && currentQCM.nextOptions) {
      setCurrentQCM({
        question: currentQCM.nextQuestion,
        options: currentQCM.nextOptions,
        isAnswered: false,
        nextQuestion: undefined,
        nextOptions: undefined
      });
    } else {
      // No more questions, reset
      setCurrentQCM(null);
    }
  };

  const handleRestart = async () => {
    if (currentTopic) {
      setQcmMessageIndices([]);
      await initQuiz(currentTopic, selectedDifficulty, selectedMode);
    }
  };

  const handleBackToMenu = () => {
    setCurrentTopic(null);
    setCurrentQCM(null);
    setQcmMessageIndices([]);
    setMessages([]);
    setInputText('');
  };

  // ===========================================================================
  // TOPIC SELECTION MENU
  // ===========================================================================
  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Animated background pattern */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] opacity-40"></div>
        
        {/* Header */}
        <header className="relative bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    F93 Quiz
                  </h1>
                  <p className="text-sm text-slate-500 font-medium">
                    Révision Nursing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Préparez votre examen{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                F93
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quiz interactifs générés par IA pour maîtriser les soins infirmiers
            </p>
          </div>

          {/* Settings Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Difficulty */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Difficulté</h3>
                </div>
                <div className="flex gap-2">
                  {[
                    { id: 'debutant', label: 'Débutant', icon: Trophy, color: 'emerald' },
                    { id: 'intermediaire', label: 'Intermédiaire', icon: Target, color: 'blue' },
                    { id: 'avance', label: 'Avancé', icon: Zap, color: 'purple' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedDifficulty(item.id as DifficultyLevel)}
                      className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300 border-2 ${
                        selectedDifficulty === item.id
                          ? `bg-${item.color}-50 border-${item.color}-500 shadow-lg shadow-${item.color}-500/20 scale-105`
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${
                        selectedDifficulty === item.id
                          ? `text-${item.color}-600`
                          : 'text-slate-400'
                      }`} />
                      <span className={`text-xs font-semibold ${
                        selectedDifficulty === item.id
                          ? `text-${item.color}-700`
                          : 'text-slate-600'
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Mode</h3>
                </div>
                <div className="flex gap-3">
                  {[
                    { id: 'chat', label: 'Conversation', icon: BookOpen, desc: '💬 Réponses libres' },
                    { id: 'qcm', label: 'QCM', icon: CheckSquare, desc: '✅ Choix multiple' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMode(item.id as QuizMode)}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 border-2 ${
                        selectedMode === item.id
                          ? 'bg-gradient-to-r from-violet-500 to-purple-500 border-violet-500 text-white shadow-lg shadow-violet-500/30 scale-105'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <div className="text-center">
                        <div className="text-sm font-bold">{item.label}</div>
                        <div className={`text-xs ${
                          selectedMode === item.id ? 'text-white/80' : 'text-slate-400'
                        }`}>{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="group relative overflow-hidden bg-white rounded-3xl p-6 text-left border border-slate-200/50 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getTopicGradient(topic.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${getTopicGradient(topic.id)} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {getTopicIcon(topic.id)}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowLeft className="w-5 h-5 text-white rotate-180" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-white transition-colors duration-500 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-white/90 transition-colors duration-500 line-clamp-2">
                    {topic.description}
                  </p>
                </div>
              </button>
            ))}

            {/* Custom Topic */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 rounded-xl">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Sujet libre</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Collez un texte ou entrez un sujet personnalisé
              </p>
              <form onSubmit={handleCustomTopicSubmit} className="space-y-3">
                <textarea
                  value={customTopicInput}
                  onChange={(e) => setCustomTopicInput(e.target.value)}
                  placeholder="Ex: Insuffisance cardiaque..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[80px] text-slate-800 placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!customTopicInput.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] disabled:hover:scale-100"
                >
                  <Sparkles className="w-4 h-4" />
                  Générer le quiz
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-slate-200/50 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Brain className="w-4 h-4" />
              <span>Propulsé par Google Gemini AI</span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Créé par Azhar
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // ===========================================================================
  // QUIZ CHAT INTERFACE
  // ===========================================================================
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[calc(100vh-2rem)] bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToMenu}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className={`p-2.5 bg-gradient-to-br ${getTopicGradient(currentTopic.id)} rounded-xl shadow-lg`}>
                {getTopicIcon(currentTopic.id)}
              </div>
              
              <div>
                <h1 className="text-lg font-bold">{currentTopic.title}</h1>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full">
                    {selectedMode === 'qcm' ? '📋 QCM' : '💬 Conversation'}
                  </span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full">
                    {selectedDifficulty === 'debutant' ? '🏆 Débutant' : selectedDifficulty === 'intermediaire' ? '🎯 Intermédiaire' : '⚡ Avancé'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Font Size */}
              <div className="flex items-center gap-1 bg-white/20 rounded-xl p-1.5">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`p-2 rounded-lg transition-all ${
                    fontSize === 'sm' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/20'
                  }`}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold px-2 text-white/90">A</span>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`p-2 rounded-lg transition-all ${
                    fontSize === 'lg' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/20'
                  }`}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all font-medium text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Recommencer</span>
              </button>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-transparent to-slate-50/50">
          {messages.length === 0 && !isLoading && !currentQCM && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 animate-pulse">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <p className="text-slate-600 font-semibold text-lg">Initialisation...</p>
                <p className="text-sm text-slate-400 mt-1">Préparation des questions</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((msg, index) => {
              if (selectedMode === 'qcm' && qcmMessageIndices.includes(index)) {
                return null;
              }
              return <ChatMessage key={msg.id} message={msg} fontSize={fontSize} />;
            })}
          </div>

          {selectedMode === 'qcm' && currentQCM && (
            <div className="mt-6 mb-4">
              <QCMOptions
                key={currentQCM.question}
                question={currentQCM.question}
                options={currentQCM.options}
                onAnswer={handleQCMAnswer}
                onNext={handleNextQuestion}
                selectedAnswer={currentQCM.selectedAnswer}
                isAnswered={currentQCM.isAnswered}
                correctAnswer={currentQCM.correctAnswer}
                explanation={currentQCM.explanation}
                fontSize={fontSize}
              />
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start w-full">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        {selectedMode === 'chat' ? (
          <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-4">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Votre réponse..."
                disabled={isLoading}
                className="flex-1 bg-slate-100 text-slate-900 placeholder-slate-400 border-0 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 disabled:shadow-none flex items-center gap-2 font-semibold disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Créé par Azhar
              </p>
            </div>
          </footer>
        ) : (
          <footer className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-2 text-center">
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Créé par Azhar
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;

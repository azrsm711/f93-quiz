export enum Sender {
  User = 'user',
  Bot = 'bot',
  System = 'system'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface QuizState {
  isLoading: boolean;
  messages: Message[];
  error: string | null;
}

export type TopicId = 'cardio' | 'diabete' | 'mpoc' | 'soins-operatoires' | 'dav' | 'custom';

export type DifficultyLevel = 'debutant' | 'intermediaire' | 'avance';

export type QuizMode = 'chat' | 'qcm';

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  content: string;
}
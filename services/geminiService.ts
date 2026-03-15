import { GoogleGenAI, Chat } from "@google/genai";
import { getSystemInstruction } from "../constants";
import { DifficultyLevel, QuizMode } from "../types";

let chatSession: Chat | null = null;

const getClient = () => {
  // Vite uses import.meta.env instead of process.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  console.log('API Key check:', apiKey ? 'Found (length: ' + apiKey.length + ')' : 'NOT FOUND');
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const startQuizSession = async (content: string, difficulty: DifficultyLevel = 'intermediaire', mode: QuizMode = 'chat'): Promise<string> => {
  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-3.1-flash-lite-preview',
      config: {
        systemInstruction: getSystemInstruction(content, difficulty, mode),
      },
    });

    // Start the conversation by asking the model to begin
    const response = await chatSession.sendMessage({
      message: mode === 'qcm'
        ? "Commence le quiz QCM maintenant. Pose la première question avec 4 options (A, B, C, D)."
        : "Commence le quiz maintenant. Pose la première question."
    });

    return response.text || "Erreur: Pas de réponse du modèle.";
  } catch (error) {
    console.error("Error starting quiz:", error);
    throw error;
  }
};

export const sendAnswer = async (userAnswer: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Session de quiz non initialisée.");
  }

  try {
    const response = await chatSession.sendMessage({
      message: userAnswer
    });
    return response.text || "Erreur: Pas de réponse du modèle.";
  } catch (error) {
    console.error("Error sending answer:", error);
    throw error;
  }
};

/**
 * Prefetch the next question in the background using a separate stateless API call.
 * This does NOT affect the main chat session context.
 */
export const prefetchNextQuestion = async (
  content: string,
  difficulty: DifficultyLevel,
  mode: QuizMode,
  previousQuestion: string
): Promise<string> => {
  const ai = getClient();
  const modeInstruction = mode === 'qcm'
    ? "Génère UNE nouvelle question QCM avec 4 options descriptives (A, B, C, D). N'utilisez JAMAIS une seule lettre pour le texte de l'option. Si c'est une abréviation, inscrivez son sens (ex: 'S - Sèche'). Format: 'A)', 'B)', 'C)', 'D)'"
    : "Génère UNE nouvelle question ouverte";

  const result = await ai.models.generateContent({
    model: 'gemini-3.1-flash-lite-preview',
    contents: `Tu es un professeur de soins infirmiers. ${modeInstruction} de niveau ${difficulty}.

Contenu pédagogique:
${content.slice(0, 2000)}

Question précédente (NE PAS répéter): "${previousQuestion.slice(0, 200)}"

Retourne UNIQUEMENT la question, sans texte d'introduction, sans conclusion, sans séparateurs (*** ou ---).
${mode === 'qcm' ? 'Format exact requis:\nQuestion?\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4' : ''}`
  });

  return result.text ?? '';
};

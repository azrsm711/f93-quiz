import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
async function test() {
  const models = ['gemini-2.0-flash-001', 'gemini-2.0-flash-lite-001', 'gemini-flash-latest', 'gemini-2.5-flash-lite', 'gemini-3.1-flash-lite-preview'];
  for (const m of models) {
    try {
      const chat = ai.chats.create({
        model: m,
        config: { systemInstruction: "You are a quiz master." },
      });
      const response = await chat.sendMessage({ message: "Start" });
      console.log(`Success for ${m}`);
    } catch (err) {
      console.log(`Error for ${m}:`, err.message.substring(0, 500));
    }
  }
}
test();

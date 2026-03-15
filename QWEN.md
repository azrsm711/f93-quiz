# F93 Quiz - QWEN Context

## 📋 Project Overview

**F93 Quiz** is a React + TypeScript educational quiz application for nursing students. It uses Google Gemini AI to generate interactive quiz questions based on specific medical content.

**Version:** 2.4.2  
**Last Updated:** March 2026  
**Hosting:** Netlify (azrsm711/f93-quiz)

---

## 🎯 Key Features (v2.4.2)

### 1. UI & Experience
- **Theme:** Catppuccin Mocha palette (base #1e1e2e).
- **Glassmorphism:** backdrop-blur panels and thin borders.
- **French UI:** All labels translated (e.g., "Excellence Infirmière").

### 2. Dynamic Session Logic
- **Target:** 20 questions per session.
- **Continuation:** Interactive modal at the end to add +10 questions or switch topics.
- **Progress:** Top-mounted dynamic gradient bar.

### 3. AI & Performance
- **Model:** `gemini-3.1-flash-lite-preview` (high quota, low latency).
- **Prefetching:** Background question generation for instant transitions.

---

## 📁 Project Structure

```
f94-quiz-app/
├── components/
│   ├── ChatMessage.tsx           # Styled bubbles + QCM Parser
│   ├── TypingIndicator.tsx       # Mocha-themed pulsing dots
│   └── QCMOptions.tsx            # Interactive clickable options
├── services/
│   └── geminiService.ts          # API logic (gemini-3.1-flash-lite-preview)
├── App.tsx                       # Main logic + Dynamic Progress/Modal
└── constants.ts                  # Medical content (F93)
```

---

## 🐛 Fix History

- **v2.4.2:** 20-question limit, continuation prompt, French translation, Netlify deployment.
- **v2.4.1:** Model update to `gemini-3.1-flash-lite-preview`, detailed error reporting.
- **v2.4.0:** Catppuccin Mocha UI overhaul, initial progress bar.
- **v2.3.2:** API quota fix.
- **v2.3.0:** QCM clickability fix (added `key` to `QCMOptions`).

---

## Qwen Added Memories
- **Hosting:** User strictly prefers **Netlify**. Do NOT switch to Firebase.
- **Repository:** `https://github.com/azrsm711/f93-quiz`
- **Environment:** Vite uses `import.meta.env.VITE_GEMINI_API_KEY`.
- **Deployment:** Live at `https://f93-quiz-nursing.netlify.app`.

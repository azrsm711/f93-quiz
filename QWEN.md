# F93 Quiz - QWEN Context

## 📋 Project Overview

**F93 Quiz** is a React + TypeScript educational quiz application for nursing students preparing for the F93 exam. It uses Google Gemini AI to generate interactive quiz questions based on specific medical content.

**Version:** 2.4.2  
**Last Updated:** March 2026

---

## 🏗️ Tech Stack

| Component | Technology | Version |
|-----------|-------------|---------|
| **Framework** | React | 19.2.3 |
| **Language** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **IA** | Google GenAI SDK | 1.37.0 |
| **Design System**| Catppuccin Mocha | Palette #1e1e2e |
| **Animations** | Motion | 12.36.0 |
| **Markdown** | React Markdown | 9.x |

---

## 🎯 Key Features (v2.4.2)

### 1. UI Modernization
- **Theme:** Catppuccin Mocha palette for a sleek, high-contrast yet soft look.
- **Glassmorphism:** Layered cards with `backdrop-blur` and thin borders.
- **Widescreen:** Optimized 16:9 layout with improved spacing and typography.

### 2. Session Progress Bar & Extension (UPDATED)
- **Tracking:** Session target of 20 questions (`targetQuestions = 20`).
- **Visuals:** Top-mounted progress bar with dynamic Mauve-to-Blue-to-Green gradients.
- **Interactive Completion:** Upon reaching the target, a dialog prompts the user to either continue with 10 more questions or return to the menu to change topics.
- **Completion:** Visual trophy badge 🎓 and "Terminé!" status.

### 3. Quiz Modes & Topics
- **Modes:** Conversation (free text) and QCM (interactive A/B/C/D cards).
- **Topics:** Cardiology, Diabetes, COPD, Perioperative, Vascular Access.

### 4. Background Prefetching ⚡
- Zero-wait transitions between questions using a stateless prefetch system.

---

## 📁 Project Structure

```
f94-quiz-app/
├── components/
│   ├── ChatMessage.tsx           # Catppuccin Mocha styled bubbles
│   ├── TypingIndicator.tsx       # Modernized pulsing dots
│   └── QCMOptions.tsx            # Clean, sleek interactive options
├── services/
│   └── geminiService.ts          # AI logic (gemini-3.1-flash-lite-preview)
├── App.tsx                       # Main logic + Dynamic Progress State
├── constants.ts                  # F93 Medical content
├── DOCUMENTATION.md              # Full user & dev docs
└── QWEN.md                       # This context file
```

---

## 🧠 State Management (App.tsx)

```typescript
const [questionCount, setQuestionCount] = useState(0);
const [targetQuestions, setTargetQuestions] = useState(20);
const [showCompletionDialog, setShowCompletionDialog] = useState(false);

// Logic:
// initQuiz: set 1
// handleSendMessage: increment on bot reply, check if > targetQuestions
// handleQCMAnswer: increment on nextParsed.isQCM, check if > targetQuestions
// handleRestart/Menu: reset count to 0, target to 20, dialog to false
```

---

## 🐛 Fix History

- **v2.4.2:** Increased limit to 20 questions + End-of-session interactive prompt.
- **v2.4.1:** Model update to `gemini-3.1-flash-lite-preview` + Detailed error reporting.
- **v2.4.0:** UI Overhaul (Catppuccin), Progress Bar, 16:9 Optimization.
- **v2.3.2:** API Limits fix -> switched to `gemini-2.5-flash-lite`.
- **v2.3.1:** Historic QCM explanation retention, text separation fix.
- **v2.3.0:** QCM clickability fix (added `key` to `QCMOptions`).
- **v2.2.0:** Prefetching system integration.
- **v2.1.2:** QCM text color readability fix.

---

## Qwen Added Memories
- The project follows a "Catppuccin Mocha" design philosophy for all UI elements.
- The session progress is managed locally in `App.tsx` via `questionCount`.
- The app is optimized for professional 16:9 medical dashboard aesthetics.
- Background prefetching is active and uses a pulsing green indicator.
- **Environment:** Port 3000, Host 0.0.0.0, uses `import.meta.env`.

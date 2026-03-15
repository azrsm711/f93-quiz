---
name: f93-quiz-dev
description: >
  Expert skill for developing, editing, and optimizing the F93 Quiz app.
  Activate when asked to: fix bugs, update UI, add features, refactor components,
  write prompts, optimize performance, or modify any file in the F93 Quiz codebase.
---

# F93 Quiz — Developer Skill

## 🧠 Project Identity

**F93 Quiz** is a React + TypeScript educational quiz app for nursing students at
Cégep Édouard-Montpetit (Quebec) preparing for the F93 exam. It uses Google Gemini AI
to generate interactive QCM and conversation-based quiz questions in French.

**Current Version:** 2.3.2  
**Model in use:** `gemini-2.5-flash-lite` (changed from flash due to 429 rate limits)  
**Environment:** Vite — use `import.meta.env.VITE_GEMINI_API_KEY`, NEVER `process.env`

---

## 📁 File Map

| File | Role |
|------|------|
| `App.tsx` | All state, layout, quiz logic, screen switching |
| `constants.ts` | Educational content + Gemini system instructions |
| `types.ts` | All TypeScript interfaces and types |
| `services/geminiService.ts` | Gemini API calls + background prefetch |
| `components/ChatMessage.tsx` | Message rendering + `parseQCM()` + font size |
| `components/QCMOptions.tsx` | Clickable QCM option cards + animations |
| `components/TypingIndicator.tsx` | 3-dot loading animation |

---

## 🔒 Hard Constraints — NEVER Violate These

1. **Never change the Gemini model name** — keep `gemini-2.5-flash-lite`
2. **Never use `process.env`** — always `import.meta.env.VITE_GEMINI_API_KEY`
3. **Never install new npm packages** — use only existing dependencies
4. **Never remove `key={currentQCM.question}`** on `<QCMOptions>` — this is a critical fix
5. **Never modify `parseQCM()` regex logic** without explicit instruction
6. **Never touch `prefetchNextQuestion()`** stateless call — it must NOT use `chatSession`
7. **Never break the QCM index tracking** (`qcmMessageIndices`) in `setMessages` callbacks
8. **All UI text, labels, and AI instructions must stay in French**
9. **Never commit `.env.local`** — it is gitignored

---

## ⚛️ React Patterns — Follow These Always

### State updates with stale closures
Always read latest state inside `setMessages` callbacks:
```typescript
// ✅ CORRECT
setMessages((prev) => {
  const newMessages = [...prev, botMsg];
  const newIndex = newMessages.length - 1; // fresh length
  return newMessages;
});

// ❌ WRONG
setMessages((prev) => [...prev, botMsg]);
const index = messages.length; // stale!
```

### QCM Component remounting
Always keep `key` prop on QCMOptions to force remount on new question:
```tsx
<QCMOptions
  key={currentQCM.question}  // ← DO NOT REMOVE
  ...
/>
```

### State resets on navigation
When user clicks back or restart, always reset:
- `messages` → `[]`
- `currentQCM` → `null`
- `qcmMessageIndices` → `[]`
- `prefetchedQuestion` → `null`
- `isPrefetching` → `false`
- `inputText` → `''`

---

## 🎨 UI / Tailwind Rules

### Current Theme (Dark Glassmorphism)
- Page background: `bg-[#0d1117]`
- Cards/panels: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`
- Primary accent: `blue-500` (#3b82f6)
- Secondary accent: `violet-500` (#8b5cf6)
- Success: `emerald-500`
- Error: `red-500`
- All body text: `text-white/80` or `text-white/90`
- Muted text: `text-white/40` or `text-white/50`

### Button States
- Default: `bg-white/5 border border-white/10 text-white/50`
- Hover: `hover:bg-white/10 hover:text-white`
- Active/selected: solid color with `/20` background + matching border
- All buttons: `rounded-full` or `rounded-xl`, `transition-all duration-150`

### QCM Option Colors (after answer)
- Correct: `bg-emerald-500/15 border-emerald-400/30 text-emerald-300`
- Incorrect: `bg-red-500/15 border-red-400/30 text-red-300`
- Unanswered text: `text-slate-700` on light bg OR `text-white/80` on dark bg

### Animation Rules (Motion library)
- Entrance: `initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}`
- Spring transitions: `transition={{ type: 'spring', stiffness: 300, damping: 25 }}`
- Pulse (icons): `animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}`
- Always add `will-change: transform` for Motion-animated elements

---

## 🤖 Gemini AI Rules

### System Instruction Requirements (constants.ts)
The AI must always be instructed to:
- Respond in **French only**
- Ask **one question at a time**
- Use feedback format: `✅ Correct — [explication]` or `❌ Incorrect — [explication]`
- **Never use `***` or `---` as separators**
- In QCM mode: options must be **descriptive** (never a single letter/word)
  - ✅ `A) S — Toux sèche`
  - ❌ `A) S`
- Separate feedback and next question with a blank line + `Question :` prefix

### Prefetch Call (geminiService.ts)
The prefetch function MUST:
- Use `ai.models.generateContent()` — stateless, no chat session
- NOT call `chatSession.sendMessage()`
- Fail silently — catch all errors, return `''` on failure
- Be triggered AFTER each bot message is received, not before

---

## 📝 TypeScript Types Reference

```typescript
// types.ts — current types
export enum Sender { User = 'user', Bot = 'bot', System = 'system' }

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
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

// QCMState — defined in App.tsx (not types.ts)
interface QCMState {
  question: string;
  options: { letter: string; text: string }[];
  isAnswered: boolean;
  correctAnswer?: string;
  explanation?: string;
}
```

When adding new types, always add them to `types.ts`. Local component state interfaces can stay in their file.

---

## 🐛 Known Bug History — Don't Re-introduce

| Bug | Root Cause | Fix Applied |
|-----|-----------|-------------|
| QCM options not clickable after Q1 | React reused component instance, `isAnimating` stuck `true` | `key={currentQCM.question}` on `<QCMOptions>` |
| Duplicate questions displayed | `messages.length` read before state update | Index calculated inside `setMessages` callback |
| White text on white background | Missing text color on QCM options | `text-slate-700` / `text-white/80` applied |
| Raw `**bold**` showing in chat | ReactMarkdown not wrapping all bot messages | All bot messages routed through `<ReactMarkdown>` |
| `***` separator bleeding into UI | AI generating `***` as divider | System prompt explicitly bans `***` and `---` |
| Explanation bleeding into next question | Regex consuming too much text | Cut string at `Question :` boundary |
| 429 RESOURCE_EXHAUSTED errors | `gemini-2.5-flash` rate limits on free tier | Switched to `gemini-2.5-flash-lite` |
| Stale `messages.length` index | Reading state outside callback | Always use `newMessages.length - 1` inside callback |

---

## 🔧 Dev Commands

```bash
npm run dev       # localhost:3000
npm run build     # production dist/
npm run lint      # TypeScript check
npm run preview   # preview prod build
```

---

## ✅ Output Format Rules

When modifying code, always:
1. Output **complete file contents** — never partial snippets
2. Use `// FILE: filename.tsx` as header before each file block
3. List which files were changed at the end
4. Do not add excessive inline comments
5. Do not change files that weren't requested
6. Preserve all existing imports — only add new ones if truly needed


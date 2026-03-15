# F93 Quiz - Documentation Complète

## 📋 Vue d'ensemble

**F93 Quiz** est une application web de quiz éducatif conçue pour les étudiants en soins infirmiers préparant l'examen F93. L'application utilise l'IA Google Gemini pour générer des questions de quiz interactives basées sur du contenu médical spécifique.

---

## 🏗️ Architecture Technique

### Stack Technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | React | 19.2.3 |
| **Langage** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **IA** | Google GenAI SDK | 1.37.0 |
| **Modèle IA** | gemini-3.1-flash-lite-preview | v2.4.1 |
| **UI Icons** | Lucide React | 0.577.0 |
| **Animations** | Motion | 12.36.0 |
| **Design System** | Catppuccin Mocha | Palette #1e1e2e |
| **Markdown** | React Markdown | 9.x |

---

## 🎨 Interface Utilisateur (v2.4.0+)

### Design System "Catppuccin Mocha"

L'application utilise une palette de couleurs moderne et apaisante:
- **Fond Principal:** `#1e1e2e` (Mocha Base)
- **Cartes & Panels:** `#181825` (Mocha Mantle) avec bordures `#313244`
- **Accents:** `#cba6f7` (Mauve) et `#89b4fa` (Blue)
- **Succès/Erreur:** `#a6e3a1` (Green) / `#f38ba8` (Red)

### Barre de Progression Dynamique

Une barre de progression a été ajoutée en haut de l'écran de quiz:
- **Objectif:** 20 questions par session par défaut (`targetQuestions = 20`)
- **Couleurs:** Transition fluide du Bleu (début) → Violet (milieu) → Vert (fin)
- **Badge:** Affiche "Question X / Y" avec un indicateur "🎓 Terminé!" en fin de session.
- **Fin de Session:** Un dialogue interactif propose de continuer avec 10 questions supplémentaires ou de changer de sujet.

---

## 🔄 Historique des Modifications

### Version 2.4.2 (Session Limit Update)
- **Limit:** Augmentation de la limite de questions de 10 à 20.
- **Prompt:** Ajout d'un dialogue de fin de session permettant de continuer (+10 questions) ou de revenir au menu.
- **State:** Gestion dynamique du nombre cible de questions via l'état React.

### Version 2.4.1 (Correctif Critique)
- **Fix:** Résolution de l'erreur "Désolé, impossible de démarrer le quiz".
- **Amélioration:** Migration vers le modèle `gemini-3.1-flash-lite-preview` pour une meilleure disponibilité et des limites de quota plus élevées.
- **Débogage:** Mise à jour de l'affichage des erreurs pour inclure le message technique réel retourné par l'IA (ex: 429 Quota Exceeded, 401 Invalid Key).

### Version 2.4.0 (UI Overhaul)
- **Thème Visuel:** Migration vers l'esthétique "Catppuccin Mocha".
- **Composants Modernisés:** Chat bubbles, options QCM et indicateur de saisie redessinés.
- **Barre de Progression:** Ajout d'un suivi de session visuel.
- **Layout 16:9:** Optimisation des espacements.

### Version 2.3.2
- Fix: Limites de quota API Gemini -> Switch vers `gemini-2.5-flash-lite` (obsolète au profit de 3.1).

### Version 2.3.1
- Fix: Options QCM plus descriptives.
- Fix: Séparation explication/question.
- Feature: Historique QCM conservé dans le chat.

### Version 2.2.0
- Feature: Préfetching des questions en arrière-plan.

---

## 🐛 Dépannage

### Erreur: "impossible de démarrer le quiz"

Si vous voyez ce message, l'erreur technique s'affiche désormais à la suite pour vous guider:

1. **Quota Exceeded (429):** L'API gratuite de Google Gemini a atteint sa limite (généralement 15 requêtes par minute). Attendez 60 secondes et recommencez.
2. **Invalid API Key (401):** Votre clé dans `.env.local` est incorrecte ou a expiré.
3. **Model Not Found (404):** Le modèle spécifié n'est pas accessible avec votre clé.

---

*Dernière mise à jour: Mars 2026*
*Version: 2.4.2*

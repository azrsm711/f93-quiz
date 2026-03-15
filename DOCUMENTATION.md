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
| **Hébergement** | Netlify | Production |
| **Design System** | Catppuccin Mocha | Palette #1e1e2e |

---

## 🚀 Déploiement (Netlify)

L'application est déployée sur Netlify avec une intégration continue via GitHub.

- **URL de Production:** [https://f93-quiz-nursing.netlify.app](https://f93-quiz-nursing.netlify.app)
- **Repository GitHub:** `azrsm711/f93-quiz`
- **Variable d'Environnement:** `VITE_GEMINI_API_KEY` (configurée dans le dashboard Netlify)

---

## 🎨 Interface Utilisateur (v2.4.2)

### Design & Localisation
- **Thème:** "Catppuccin Mocha" (sombre, élégant, haute lisibilité).
- **Localisation:** Interface entièrement en français (ex: "Excellence Infirmière").
- **Optimisation:** Mise en page 16:9 avec effets de glassmorphisme.

### Session & Progression
- **Objectif:** 20 questions par session par défaut.
- **Barre de Progression:** Évolue de Mauve à Bleu à Vert selon l'avancement.
- **Dialogue de Fin:** À la 20ème question, un prompt propose de continuer (+10 questions) ou de changer de sujet.

---

## 🔄 Historique des Modifications

### Version 2.4.2 (Session & Traduction)
- **Limit:** Augmentation de la limite à 20 questions.
- **Prompt:** Dialogue interactif pour prolonger la session ou changer de sujet.
- **Traduction:** Remplacement de "Nursing Excellence" par "Excellence Infirmière".
- **Netlify:** Déploiement final et confirmation de la plateforme.

### Version 2.4.1 (Correctif Critique)
- **Fix:** Résolution de l'erreur "impossible de démarrer le quiz".
- **Modèle:** Passage à `gemini-3.1-flash-lite-preview`.
- **Debug:** Affichage des messages d'erreur techniques détaillés.

---

*Dernière mise à jour: Mars 2026*
*Version: 2.4.2*

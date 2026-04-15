Peace is a modern, emotion-aware mental health web application that helps users calm their mind, recognise behavioral patterns, and restore emotional balance through music therapy, guided breathing, journaling, and reflective quizzes.

The app dynamically adapts UI colours, sound visualisations, and recommendations based on the user’s mood, creating a soothing and personalised experience.

 ** Features

 Mood-Based Music Therapy

Personalized music suggestions based on emotional state
Supports classical, ambient nature sounds, binaural beats, 432 Hz music, and glass music
Real-time sound wave visualizations

 Emotion-Driven UI

Backgrounds and wave colors adapt to mood
Calm, non-overstimulating color system
Glassmorphic and accessible design

 Guided Breathing Exercises
Animated breathing patterns (inhale, hold, exhale)
Helps regulate stress and anxiety

 Behavioral Pattern Quiz

Short reflective quiz to identify emotional patterns
No diagnoses or labels
Links results to personalised recommendations

 Private Journaling

Distraction-free writing experience
Local-first data storage for privacy

 Tech Stack
Frontend - React 18.3.1, TypeScript, Vite 6.3.5

UI & Styling - Tailwind CSS, Radix UI (accessible UI primitives), Lucide React (icons), class-variance-authority, tailwind-merge

Animations & Interactions - Motion (animation library)

Forms & Data Handling - React Hook Form

Charts & Visuals - Recharts

 Project Structure
src/
├── components/        # Reusable UI components
├── features/          # Feature-based modules (quiz, music, journal)
├── pages/             # App routes/pages
├── hooks/             # Custom React hooks
├── lib/               # Utilities and helpers
├── styles/            # Global styles
├── assets/            # Icons, images, audio references
├── App.tsx
└── main.tsx

 Design Philosophy

Emotion-first UX
Non-judgmental and non-clinical
Slow, calming animations
Accessibility-focused

Privacy-conscious (local-first approach)

Inspired by Calm, Headspace, and modern wellness design systems.
 
 Future Enhancements

Adaptive playlists based on long-term mood trends
Sleep mode with auto-fade audio


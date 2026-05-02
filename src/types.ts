export type Screen = "auth" | "home" | "breathing" | "journal" | "mood-history" | "music-therapy" | "player" | "admin" | "quiz";

export interface User {
  _id: string;
  email: string;
  token: string;
  role: 'user' | 'admin';
}

export type MoodConfig = {
  _id: string;
  id: string;
  label: string;
  emoji: string;
  gradient: string;
  solidColor: string;
  description: string;
};

export type MusicTrack = {
  _id: string;
  title: string;
  description: string;
  duration: string; // "M:SS"
  category: string;
  moods: string[];
  fileUrl: string;
};

export interface QuizOption {
  _id?: string;
  text: string;
  moodImpact: string;
  scoreValue: number;
}

export interface QuizQuestion {
  _id: string;
  questionText: string;
  options: QuizOption[];
  order: number;
}

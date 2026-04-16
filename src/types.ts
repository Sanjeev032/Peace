export type Screen = "home" | "breathing" | "journal" | "mood-history" | "music-therapy" | "player" | "admin";

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

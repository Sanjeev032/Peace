import { useState } from "react";
import { Home } from "./components/Home";
import { BreathingExercise } from "./components/BreathingExercise";
import { Journal } from "./components/Journal";
import { SessionPlayer } from "./components/SessionPlayer";
import { MoodHistory } from "./components/MoodHistory";
import { MusicTherapy } from "./components/MusicTherapy";
import { MoodBasedMusicTherapy } from "./components/MoodBasedMusicTherapy";

export type Screen =
  | "home"
  | "breathing"
  | "journal"
  | "session"
  | "mood-history"
  | "music-therapy"
  | "mood-music-therapy";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [selectedSession, setSelectedSession] =
    useState<string>("");

  const handleNavigate = (
    screen: Screen,
    sessionTitle?: string,
  ) => {
    setCurrentScreen(screen);
    if (sessionTitle) {
      setSelectedSession(sessionTitle);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071224] via-[#0A1A2F] to-[#071F2D] relative overflow-hidden">
      {/* Background subtle gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#8FD3FF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#A68BFF]/10 rounded-full blur-[150px]"></div>
      </div>

      {currentScreen === "home" && (
        <Home onNavigate={handleNavigate} />
      )}
      {currentScreen === "breathing" && (
        <BreathingExercise onNavigate={handleNavigate} />
      )}
      {currentScreen === "journal" && (
        <Journal onNavigate={handleNavigate} />
      )}
      {currentScreen === "session" && (
        <SessionPlayer
          onNavigate={handleNavigate}
          sessionTitle={selectedSession}
        />
      )}
      {currentScreen === "mood-history" && (
        <MoodHistory onNavigate={handleNavigate} />
      )}
      {currentScreen === "music-therapy" && (
        <MusicTherapy onNavigate={handleNavigate} />
      )}
      {currentScreen === "mood-music-therapy" && (
        <MoodBasedMusicTherapy onNavigate={handleNavigate} />
      )}
    </div>
  );
}
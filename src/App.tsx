import { useState } from "react";
import { Home } from "./components/Home";
import { BreathingExercise } from "./components/BreathingExercise";
import { Journal } from "./components/Journal";
import { MoodHistory } from "./components/MoodHistory";
import { MoodBasedMusicTherapy } from "./components/MoodBasedMusicTherapy";
import { SessionPlayer } from "./components/SessionPlayer";
import { AdminDashboard } from "./components/AdminDashboard";
import { Screen, MusicTrack } from "./types";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [activeTrack, setActiveTrack] = useState<MusicTrack | null>(null);

  const handleNavigate = (screen: Screen, track?: MusicTrack) => {
    setCurrentScreen(screen);
    if (track) {
      setActiveTrack(track);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5F2ED] to-[#EAECE4] relative overflow-hidden selection:bg-[#8BA888]/20">
      {/* Background subtle organic gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#8BA888]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-[#C17F5B]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
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
      {currentScreen === "mood-history" && (
        <MoodHistory onNavigate={handleNavigate} />
      )}
      {currentScreen === "music-therapy" && (
        <MoodBasedMusicTherapy onNavigate={handleNavigate} />
      )}
      {currentScreen === "player" && activeTrack && (
        <SessionPlayer onNavigate={handleNavigate} track={activeTrack} />
      )}
      {currentScreen === "admin" && (
        <AdminDashboard onBack={() => setCurrentScreen("home")} />
      )}
    </div>
  );
}
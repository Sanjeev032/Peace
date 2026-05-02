import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { BreathingExercise } from "./components/BreathingExercise";
import { Journal } from "./components/Journal";
import { MoodHistory } from "./components/MoodHistory";
import { MoodBasedMusicTherapy } from "./components/MoodBasedMusicTherapy";
import { SessionPlayer } from "./components/SessionPlayer";
import { AdminDashboard } from "./components/AdminDashboard";
import { Quiz } from "./components/Quiz";
import { Auth } from "./components/Auth";
import { Screen, MusicTrack, User } from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [activeTrack, setActiveTrack] = useState<MusicTrack | null>(null);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentScreen("home");
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsInitializing(false);
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setCurrentScreen("auth");
  };

  const handleNavigate = (screen: Screen, track?: MusicTrack) => {
    setCurrentScreen(screen);
    if (track) {
      setActiveTrack(track);
    }
  };

  const handleMoodDetected = (mood: string) => {
    setDetectedMood(mood);
  };

  if (isInitializing) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5F2ED] to-[#EAECE4] relative overflow-hidden selection:bg-[#8BA888]/20">
      {/* Background subtle organic gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#8BA888]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-[#C17F5B]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      {currentScreen === "auth" && !user && (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}

      {currentScreen === "home" && (
        <Home onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      )}
      {currentScreen === "quiz" && (
        <Quiz onNavigate={handleNavigate} onMoodDetected={handleMoodDetected} />
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
        <MoodBasedMusicTherapy onNavigate={handleNavigate} initialMood={detectedMood} />
      )}
      {currentScreen === "player" && activeTrack && (
        <SessionPlayer onNavigate={handleNavigate} track={activeTrack} />
      )}
      {currentScreen === "admin" && user?.role === 'admin' && (
        <AdminDashboard onBack={() => setCurrentScreen("home")} />
      )}
    </div>
  );
}
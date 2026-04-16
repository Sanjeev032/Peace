import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Loader2, AlertCircle } from 'lucide-react';
import { fetchMoodConfigs, fetchMusicByMood, createMoodEntry } from '../services/api';
import { Screen, MoodConfig, MusicTrack } from '../types';

interface MoodBasedMusicTherapyProps {
  onNavigate: (screen: Screen) => void;
}

export type Mood = string;

export function MoodBasedMusicTherapy({ onNavigate }: MoodBasedMusicTherapyProps) {
  const [moodConfigs, setMoodConfigs] = useState<Record<string, MoodConfig>>({});
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [musicLibrary, setMusicLibrary] = useState<MusicTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [audio] = useState(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [durationInSeconds, setDurationInSeconds] = useState(0);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const configs = await fetchMoodConfigs();
        const configMap = configs.reduce((acc: any, config: MoodConfig) => {
          acc[config.id] = config;
          return acc;
        }, {});
        setMoodConfigs(configMap);
      } catch (err) {
        setError('Could not load mood settings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadConfigs();
  }, []);

  useEffect(() => {
    if (selectedMood) {
      const loadMusic = async () => {
        setIsLoading(true);
        try {
          const tracks = await fetchMusicByMood(selectedMood);
          setMusicLibrary(tracks);
        } catch (err) {
          setError('Could not load music for this mood.');
        } finally {
          setIsLoading(false);
        }
      };
      loadMusic();
    }
  }, [selectedMood]);

  // Audio handling
  useEffect(() => {
    if (selectedTrack) {
      audio.src = selectedTrack.fileUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(err => console.error("Playback failed:", err));
      }
    } else {
      audio.pause();
      audio.src = "";
    }
  }, [selectedTrack]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(err => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDurationInSeconds(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audio]);

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setSelectedTrack(null);
    setIsPlaying(false);
    setProgress(0);

    // Save mood entry to backend if logged in
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Map mood label to a score (e.g., higher for more positive moods)
        // This is a simple heuristic; ideally the config would have a score
        const score = mood === 'calm' || mood === 'peace' ? 8 : (mood === 'focus' ? 7 : 5);
        await createMoodEntry(mood, score, token);
      }
    } catch (err) {
      console.warn('Failed to save mood entry:', err);
      // Don't show modal error for this, just log it as it's a background sync
    }
  };


  const handleTrackSelect = (track: MusicTrack) => {
    setSelectedTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredTracks = musicLibrary; // Already filtered by API

  const currentMoodConfig = selectedMood ? moodConfigs[selectedMood] : null;



  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading && !selectedMood) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED]">
        <Loader2 className="w-10 h-10 animate-spin text-[#8BA888]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F2ED] px-6 text-center">
        <AlertCircle className="w-12 h-12 text-[#C17F5B] mb-4" />
        <h2 className="text-[#2D2D2D] mb-2 font-serif">Oops! Something went wrong</h2>
        <p className="text-[#5C5C5C] mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-[#8BA888] text-white rounded-full hover:bg-[#7A9777] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mood-based gradient background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMood || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 -z-10"
          style={{
            background: currentMoodConfig
              ? currentMoodConfig.gradient
              : 'linear-gradient(135deg, #071224 0%, #0A1A2F 100%)'
          }}
        />
      </AnimatePresence>

      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05' /%3E%3C/svg%3E")`
        }}
      />

      {/* Header */}
      <div className="px-5 py-6 flex items-center justify-between relative z-20">
        <button
          onClick={() => onNavigate('home')}
          className="text-white/60 hover:text-white/90 transition-colors p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-white/90">Music Therapy</h2>
        <div className="w-10" />
      </div>

      {/* Content */}
      {!selectedMood ? (
        <MoodSelection onMoodSelect={handleMoodSelect} moodConfigs={moodConfigs} />
      ) : (
        <div className="relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden px-5 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Mood header */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{currentMoodConfig?.emoji}</div>
                <h1 className="text-[#2D2D2D] mb-1 font-serif">
                  Feeling {currentMoodConfig?.label}
                </h1>
                <p className="text-[#5C5C5C]">{currentMoodConfig?.description}</p>
                <button
                  onClick={() => setSelectedMood(null)}
                  className="mt-3 text-[#5C5C5C]/60 hover:text-[#5C5C5C]/90 transition-colors text-sm underline underline-offset-4"
                >
                  Change mood
                </button>
              </div>

              {selectedTrack ? (
                <>
                  {/* Sound Wave Visualizer */}
                  <MoodWaveVisualizer
                    isPlaying={isPlaying}
                    mood={selectedMood}
                    color={currentMoodConfig?.solidColor || '#8BA888'}
                  />

                  {/* Track Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center my-6"
                  >
                    <h2 className="text-[#2D2D2D] mb-1 font-serif">{selectedTrack.title}</h2>
                    <p className="text-[#5C5C5C]">{selectedTrack.description}</p>
                    <p className="text-[#5C5C5C]/50 text-sm mt-2">{selectedTrack.category}</p>
                  </motion.div>

                  {/* Progress Bar */}
                  <div className="w-full mb-6 px-4">
                    <div className="relative h-1.5 bg-[#2D2D2D]/5 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ 
                          backgroundColor: currentMoodConfig?.solidColor || '#8BA888',
                          width: `${progress}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[#5C5C5C]/60 text-xs font-medium">
                      <span>{formatTime(currentTime)}</span>
                      <span>{selectedTrack.duration}</span>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="backdrop-blur-md bg-white/40 border border-white/60 rounded-[32px] p-6 mb-6"
                  >
                    <div className="flex items-center justify-center gap-8 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors"
                      >
                        <SkipBack className="w-7 h-7" />
                      </motion.button>

                      <motion.button
                        onClick={handlePlayPause}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: `${currentMoodConfig?.solidColor || '#8BA888'}20`,
                          border: `2px solid ${currentMoodConfig?.solidColor || '#8BA888'}`,
                          boxShadow: isPlaying
                            ? `0 12px 32px ${currentMoodConfig?.solidColor || '#8BA888'}40`
                            : 'none'
                        }}
                      >
                        {isPlaying ? (
                          <Pause className="w-10 h-10 text-[#2D2D2D]" fill="currentColor" />
                        ) : (
                          <Play className="w-10 h-10 text-[#2D2D2D] ml-1" fill="currentColor" />
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors"
                      >
                        <SkipForward className="w-7 h-7" />
                      </motion.button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-4 px-2">
                      <Volume2 className="w-5 h-5 text-[#5C5C5C]/60" />
                      <div className="flex-1 relative h-1.5 bg-[#2D2D2D]/5 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${volume}%`,
                            backgroundColor: currentMoodConfig?.solidColor || '#8BA888'
                          }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <span className="text-[#5C5C5C]/60 w-10 text-right text-xs font-medium">{volume}%</span>
                    </div>
                  </motion.div>

                  {/* Back to tracks */}
                  <button
                    onClick={() => setSelectedTrack(null)}
                    className="w-full text-center text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors py-3 text-sm font-medium"
                  >
                    Choose different track
                  </button>
                </>
              ) : (
                <>
                  {/* Music recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-[#2D2D2D] mb-4 font-serif">Recommended for you</h3>
                    {filteredTracks.map((track, index) => (
                      <motion.div
                        key={track._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MoodMusicCard
                          track={track}
                          moodColor={currentMoodConfig?.solidColor || '#8BA888'}
                          onSelect={() => handleTrackSelect(track)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-12">
                {/* Left Column - Visualizer & Player */}
                <div className="col-span-2 space-y-8">
                  {/* Mood header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-6xl">{currentMoodConfig?.emoji}</div>
                      <div>
                        <h1 className="text-[#2D2D2D] mb-1 font-serif tracking-tight">
                          Feeling {currentMoodConfig?.label}
                        </h1>
                        <p className="text-[#5C5C5C] text-lg">{currentMoodConfig?.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMood(null)}
                      className="text-[#5C5C5C]/50 hover:text-[#2D2D2D] transition-colors underline underline-offset-4"
                    >
                      Change mood
                    </button>
                  </div>

                  {selectedTrack && (
                    <>
                      {/* Sound Wave Visualizer */}
                      <MoodWaveVisualizer
                        isPlaying={isPlaying}
                        mood={selectedMood}
                        color={currentMoodConfig?.solidColor || '#8BA888'}
                      />

                      {/* Player Controls */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="backdrop-blur-md bg-white/40 border border-white/60 rounded-[40px] p-8"
                      >
                        {/* Track Info */}
                        <div className="mb-8">
                          <h2 className="text-[#2D2D2D] mb-2 font-serif text-2xl">{selectedTrack.title}</h2>
                          <p className="text-[#5C5C5C] text-lg">{selectedTrack.description}</p>
                          <span className="inline-block mt-3 px-3 py-1 bg-[#2D2D2D]/5 text-[#5C5C5C] text-xs font-bold rounded-full tracking-wider uppercase">
                            {selectedTrack.category}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full mb-10">
                          <div className="relative h-1.5 bg-[#2D2D2D]/5 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full"
                              style={{ 
                                backgroundColor: currentMoodConfig?.solidColor || '#8BA888',
                                width: `${progress}%` 
                              }}
                            />
                          </div>
                          <div className="flex justify-between mt-3 text-[#5C5C5C]/60 text-sm font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{selectedTrack.duration}</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-8">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors"
                            >
                              <SkipBack className="w-8 h-8" />
                            </motion.button>

                            <motion.button
                              onClick={handlePlayPause}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full w-24 h-24 flex items-center justify-center transition-all duration-300"
                              style={{
                                backgroundColor: `${currentMoodConfig?.solidColor || '#8BA888'}20`,
                                border: `2px solid ${currentMoodConfig?.solidColor || '#8BA888'}`,
                                boxShadow: isPlaying
                                  ? `0 12px 40px ${currentMoodConfig?.solidColor || '#8BA888'}40`
                                  : 'none'
                              }}
                            >
                              {isPlaying ? (
                                <Pause className="w-12 h-12 text-[#2D2D2D]" fill="currentColor" />
                              ) : (
                                <Play className="w-12 h-12 text-[#2D2D2D] ml-1" fill="currentColor" />
                              )}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors"
                            >
                              <SkipForward className="w-8 h-8" />
                            </motion.button>
                          </div>

                          {/* Volume Control */}
                          <div className="flex items-center gap-6 w-72">
                            <Volume2 className="w-6 h-6 text-[#5C5C5C]/60" />
                            <div className="flex-1 relative h-1.5 bg-[#2D2D2D]/5 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{
                                  width: `${volume}%`,
                                  backgroundColor: currentMoodConfig?.solidColor || '#8BA888'
                                }}
                              />
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                              />
                            </div>
                            <span className="text-[#5C5C5C]/60 w-12 text-right text-sm font-bold">{volume}%</span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Right Column - Recommendations */}
                <div className="space-y-6">
                  <h3 className="text-[#2D2D2D] font-serif text-xl border-b border-[#2D2D2D]/5 pb-4">Recommended for you</h3>
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredTracks.map((track, index) => (
                      <motion.div
                        key={track._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MoodMusicCard
                          track={track}
                          moodColor={currentMoodConfig?.solidColor || '#8BA888'}
                          onSelect={() => handleTrackSelect(track)}
                          isActive={selectedTrack?._id === track._id}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

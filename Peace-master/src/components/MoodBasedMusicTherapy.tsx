import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Screen } from '../App';
import { MoodSelection } from './MoodSelection';
import { MoodWaveVisualizer } from './MoodWaveVisualizer';
import { MoodMusicCard } from './MoodMusicCard';

interface MoodBasedMusicTherapyProps {
  onNavigate: (screen: Screen) => void;
}

export type Mood = 'calm' | 'happy' | 'anxious' | 'sad' | 'tired';

export type MoodConfig = {
  id: Mood;
  label: string;
  emoji: string;
  gradient: string;
  solidColor: string;
  description: string;
};

export const moodConfigs: Record<Mood, MoodConfig> = {
  calm: {
    id: 'calm',
    label: 'Calm',
    emoji: '😌',
    gradient: 'linear-gradient(135deg, #B4D4B4 0%, #D8E9D8 100%)',
    solidColor: '#B4D4B4',
    description: 'Peaceful and centered'
  },
  happy: {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    gradient: 'linear-gradient(135deg, #FFD4A3 0%, #FFF4E0 100%)',
    solidColor: '#FFD4A3',
    description: 'Joyful and energized'
  },
  anxious: {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    gradient: 'linear-gradient(135deg, #A3D5FF 0%, #D4EBFF 100%)',
    solidColor: '#A3D5FF',
    description: 'Seeking relief'
  },
  sad: {
    id: 'sad',
    label: 'Sad',
    emoji: '😔',
    gradient: 'linear-gradient(135deg, #C8B6E2 0%, #E6DFF0 100%)',
    solidColor: '#C8B6E2',
    description: 'Needing comfort'
  },
  tired: {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    gradient: 'linear-gradient(135deg, #B8B8B8 0%, #E0E0E0 100%)',
    solidColor: '#B8B8B8',
    description: 'Seeking rest'
  }
};

export type MusicTrack = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  moods: Mood[];
};

const musicLibrary: MusicTrack[] = [
  {
    id: 'ocean-waves',
    title: 'Ocean Waves',
    description: 'Gentle waves for deep calm',
    duration: '30 min',
    category: 'Ambient Sounds',
    moods: ['calm', 'anxious', 'tired']
  },
  {
    id: 'forest-morning',
    title: 'Forest Morning',
    description: 'Birds and rustling leaves',
    duration: '25 min',
    category: 'Nature Sounds',
    moods: ['calm', 'happy']
  },
  {
    id: 'rain-meditation',
    title: 'Rain Meditation',
    description: 'Soft rainfall for reflection',
    duration: '45 min',
    category: 'Ambient Sounds',
    moods: ['calm', 'sad', 'tired']
  },
  {
    id: 'classical-peace',
    title: 'Classical Peace',
    description: 'Mozart and Bach',
    duration: '40 min',
    category: 'Classical Music',
    moods: ['calm', 'sad']
  },
  {
    id: 'binaural-anxiety',
    title: 'Anxiety Relief',
    description: 'Calming frequency patterns',
    duration: '20 min',
    category: 'Binaural Beats',
    moods: ['anxious', 'tired']
  },
  {
    id: '432hz-healing',
    title: 'Healing Frequency',
    description: '432 Hz restorative sound',
    duration: '25 min',
    category: '432 Hz Music',
    moods: ['calm', 'anxious', 'sad']
  },
  {
    id: 'glass-bowls',
    title: 'Crystal Bowls',
    description: 'Singing bowls meditation',
    duration: '15 min',
    category: 'Glass Music',
    moods: ['calm', 'tired']
  },
  {
    id: 'uplifting-nature',
    title: 'Uplifting Nature',
    description: 'Cheerful birds and streams',
    duration: '20 min',
    category: 'Nature Sounds',
    moods: ['happy']
  },
  {
    id: 'gentle-comfort',
    title: 'Gentle Comfort',
    description: 'Soothing ambient textures',
    duration: '35 min',
    category: 'Ambient Sounds',
    moods: ['sad', 'tired']
  }
];

export function MoodBasedMusicTherapy({ onNavigate }: MoodBasedMusicTherapyProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setSelectedTrack(null);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTrackSelect = (track: MusicTrack) => {
    setSelectedTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredTracks = selectedMood
    ? musicLibrary.filter(track => track.moods.includes(selectedMood))
    : [];

  const currentMoodConfig = selectedMood ? moodConfigs[selectedMood] : null;

  const currentDuration = selectedTrack ? parseInt(selectedTrack.duration) * 60 : 0;
  const currentTime = (progress / 100) * currentDuration;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        <MoodSelection onMoodSelect={handleMoodSelect} />
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
                <div className="text-5xl mb-3">{currentMoodConfig.emoji}</div>
                <h1 className="text-white/90 mb-1">
                  Feeling {currentMoodConfig.label}
                </h1>
                <p className="text-white/60">{currentMoodConfig.description}</p>
                <button
                  onClick={() => setSelectedMood(null)}
                  className="mt-3 text-white/50 hover:text-white/70 transition-colors text-sm"
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
                    color={currentMoodConfig.solidColor}
                  />

                  {/* Track Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center my-6"
                  >
                    <h2 className="text-white/90 mb-1">{selectedTrack.title}</h2>
                    <p className="text-white/60">{selectedTrack.description}</p>
                    <p className="text-white/50 text-sm mt-2">{selectedTrack.category}</p>
                  </motion.div>

                  {/* Progress Bar */}
                  <div className="w-full mb-6">
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ backgroundColor: currentMoodConfig.solidColor }}
                        animate={{ width: isPlaying ? '100%' : `${progress}%` }}
                        transition={{ duration: isPlaying ? currentDuration : 0, ease: 'linear' }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-white/50 text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <span>{selectedTrack.duration}</span>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[24px] p-6 mb-6"
                  >
                    <div className="flex items-center justify-center gap-8 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/60 hover:text-white/90 transition-colors"
                      >
                        <SkipBack className="w-7 h-7" />
                      </motion.button>

                      <motion.button
                        onClick={handlePlayPause}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: `${currentMoodConfig.solidColor}40`,
                          border: `2px solid ${currentMoodConfig.solidColor}`,
                          boxShadow: isPlaying
                            ? `0 8px 32px ${currentMoodConfig.solidColor}60`
                            : 'none'
                        }}
                      >
                        {isPlaying ? (
                          <Pause className="w-10 h-10 text-white" fill="currentColor" />
                        ) : (
                          <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/60 hover:text-white/90 transition-colors"
                      >
                        <SkipForward className="w-7 h-7" />
                      </motion.button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-4">
                      <Volume2 className="w-5 h-5 text-white/60" />
                      <div className="flex-1 relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${volume}%`,
                            backgroundColor: currentMoodConfig.solidColor
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
                      <span className="text-white/60 w-10 text-right text-sm">{volume}%</span>
                    </div>
                  </motion.div>

                  {/* Back to tracks */}
                  <button
                    onClick={() => setSelectedTrack(null)}
                    className="w-full text-center text-white/60 hover:text-white/80 transition-colors py-3"
                  >
                    Choose different track
                  </button>
                </>
              ) : (
                <>
                  {/* Music recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-white/90 mb-4">Recommended for you</h3>
                    {filteredTracks.map((track, index) => (
                      <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MoodMusicCard
                          track={track}
                          moodColor={currentMoodConfig.solidColor}
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
              <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Visualizer & Player */}
                <div className="col-span-2 space-y-6">
                  {/* Mood header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{currentMoodConfig.emoji}</div>
                      <div>
                        <h1 className="text-white/90 mb-1">
                          Feeling {currentMoodConfig.label}
                        </h1>
                        <p className="text-white/60">{currentMoodConfig.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMood(null)}
                      className="text-white/50 hover:text-white/70 transition-colors"
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
                        color={currentMoodConfig.solidColor}
                      />

                      {/* Player Controls */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[24px] p-8"
                      >
                        {/* Track Info */}
                        <div className="mb-6">
                          <h2 className="text-white/90 mb-1">{selectedTrack.title}</h2>
                          <p className="text-white/60">{selectedTrack.description}</p>
                          <p className="text-white/50 text-sm mt-1">{selectedTrack.category}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full mb-8">
                          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full rounded-full"
                              style={{ backgroundColor: currentMoodConfig.solidColor }}
                              animate={{ width: isPlaying ? '100%' : `${progress}%` }}
                              transition={{ duration: isPlaying ? currentDuration : 0, ease: 'linear' }}
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-white/50 text-sm">
                            <span>{formatTime(currentTime)}</span>
                            <span>{selectedTrack.duration}</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-white/60 hover:text-white/90 transition-colors"
                            >
                              <SkipBack className="w-7 h-7" />
                            </motion.button>

                            <motion.button
                              onClick={handlePlayPause}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300"
                              style={{
                                backgroundColor: `${currentMoodConfig.solidColor}40`,
                                border: `2px solid ${currentMoodConfig.solidColor}`,
                                boxShadow: isPlaying
                                  ? `0 8px 32px ${currentMoodConfig.solidColor}60`
                                  : 'none'
                              }}
                            >
                              {isPlaying ? (
                                <Pause className="w-10 h-10 text-white" fill="currentColor" />
                              ) : (
                                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                              )}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-white/60 hover:text-white/90 transition-colors"
                            >
                              <SkipForward className="w-7 h-7" />
                            </motion.button>
                          </div>

                          {/* Volume Control */}
                          <div className="flex items-center gap-4 w-64">
                            <Volume2 className="w-5 h-5 text-white/60" />
                            <div className="flex-1 relative h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full rounded-full"
                                style={{
                                  width: `${volume}%`,
                                  backgroundColor: currentMoodConfig.solidColor
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
                            <span className="text-white/60 w-10 text-right text-sm">{volume}%</span>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Right Column - Recommendations */}
                <div className="space-y-4">
                  <h3 className="text-white/90">Recommended for you</h3>
                  {filteredTracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MoodMusicCard
                        track={track}
                        moodColor={currentMoodConfig.solidColor}
                        onSelect={() => handleTrackSelect(track)}
                        isActive={selectedTrack?.id === track.id}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

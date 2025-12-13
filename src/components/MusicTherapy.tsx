import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Screen } from '../App';
import { SoundWaveVisualizer } from './SoundWaveVisualizer';
import { MusicCategoryCard } from './MusicCategoryCard';

interface MusicTherapyProps {
  onNavigate: (screen: Screen) => void;
}

export type MusicCategory = {
  id: string;
  title: string;
  description: string;
  duration: string;
  color: string;
  waveType: 'flowing' | 'bars' | 'circular' | 'harmonic';
};

const musicCategories: MusicCategory[] = [
  {
    id: 'classical',
    title: 'Classical Music',
    description: 'Calming compositions by Mozart, Bach, and Beethoven',
    duration: '45 min',
    color: '#D4AF37',
    waveType: 'flowing'
  },
  {
    id: 'ambient',
    title: 'Ambient Sounds',
    description: 'Ocean waves, rainfall, forest birds',
    duration: '30 min',
    color: '#8FD3FF',
    waveType: 'flowing'
  },
  {
    id: 'binaural',
    title: 'Binaural Beats',
    description: 'Stress-relief frequency music',
    duration: '20 min',
    color: '#A68BFF',
    waveType: 'bars'
  },
  {
    id: '432hz',
    title: '432 Hz Frequency',
    description: 'Natural tuning for emotional balance',
    duration: '25 min',
    color: '#8FFFDB',
    waveType: 'harmonic'
  },
  {
    id: 'nature',
    title: 'Nature-Based Tracks',
    description: 'Rain, ocean, wind, leaves',
    duration: '35 min',
    color: '#8FD3FF',
    waveType: 'flowing'
  },
  {
    id: 'glass',
    title: 'Glass Music',
    description: 'Crystal bowl and glass harp sounds',
    duration: '15 min',
    color: '#C8B6FF',
    waveType: 'circular'
  }
];

export function MusicTherapy({ onNavigate }: MusicTherapyProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory | null>(null);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectCategory = (category: MusicCategory) => {
    setSelectedCategory(category);
    setProgress(0);
    setIsPlaying(true);
  };

  const currentDuration = selectedCategory ? parseInt(selectedCategory.duration) * 60 : 0;
  const currentTime = (progress / 100) * currentDuration;
  const remainingTime = currentDuration - currentTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 min-h-screen">
      {/* Animated Nebula Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isPlaying
            ? [
                'radial-gradient(circle at 20% 30%, rgba(143, 211, 255, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(166, 139, 255, 0.15), transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(166, 139, 255, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(143, 211, 255, 0.15), transparent 50%)',
                'radial-gradient(circle at 20% 30%, rgba(143, 211, 255, 0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(166, 139, 255, 0.15), transparent 50%)'
              ]
            : 'radial-gradient(circle at 50% 50%, rgba(143, 211, 255, 0.08), transparent 50%)'
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
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

      {/* Mobile Layout */}
      <div className="lg:hidden px-5 pb-32">
        {selectedCategory ? (
          // Player View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Sound Wave Visualizer */}
            <SoundWaveVisualizer
              isPlaying={isPlaying}
              category={selectedCategory}
            />

            {/* Track Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-white mb-2">{selectedCategory.title}</h1>
              <p className="text-white/60">{selectedCategory.description}</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF]"
                  animate={{ width: isPlaying ? '100%' : `${progress}%` }}
                  transition={{ duration: isPlaying ? currentDuration : 0, ease: 'linear' }}
                  onAnimationComplete={() => {
                    if (isPlaying) setProgress(100);
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-white/50">
                <span>{formatTime(currentTime)}</span>
                <span>{selectedCategory.duration}</span>
              </div>
            </div>

            {/* Player Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] p-6"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
              }}
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
                  className="backdrop-blur-md bg-gradient-to-br from-[#8FD3FF]/20 to-[#A68BFF]/20 border border-white/20 rounded-full w-20 h-20 flex items-center justify-center hover:from-[#8FD3FF]/30 hover:to-[#A68BFF]/30 transition-all duration-300"
                  style={{
                    boxShadow: isPlaying
                      ? '0 8px 32px rgba(143, 211, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                      : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white/90" fill="currentColor" />
                  ) : (
                    <Play className="w-10 h-10 text-white/90 ml-1" fill="currentColor" />
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
                <div className="flex-1 relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF]"
                    style={{ width: `${volume}%` }}
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
                <span className="text-white/60 w-10 text-right">{volume}%</span>
              </div>
            </motion.div>

            {/* Back to Categories */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-full text-center text-[#8FD3FF] hover:text-[#A68BFF] transition-colors py-3"
            >
              Choose different therapy
            </button>
          </motion.div>
        ) : (
          // Category Selection View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/60 text-center mb-8">
              Choose a therapeutic sound experience
            </p>

            <div className="space-y-4">
              {musicCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MusicCategoryCard
                    category={category}
                    onSelect={() => handleSelectCategory(category)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Visualizer & Player */}
            <div className="col-span-2 space-y-8">
              {selectedCategory ? (
                <>
                  {/* Sound Wave Visualizer */}
                  <SoundWaveVisualizer
                    isPlaying={isPlaying}
                    category={selectedCategory}
                  />

                  {/* Player Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] p-8"
                    style={{
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Track Info */}
                    <div className="mb-6">
                      <h1 className="text-white mb-2">{selectedCategory.title}</h1>
                      <p className="text-white/60">{selectedCategory.description}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full mb-8">
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF]"
                          animate={{ width: isPlaying ? '100%' : `${progress}%` }}
                          transition={{ duration: isPlaying ? currentDuration : 0, ease: 'linear' }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-white/50">
                        <span>{formatTime(currentTime)}</span>
                        <span>{selectedCategory.duration}</span>
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
                          className="backdrop-blur-md bg-gradient-to-br from-[#8FD3FF]/20 to-[#A68BFF]/20 border border-white/20 rounded-full w-20 h-20 flex items-center justify-center hover:from-[#8FD3FF]/30 hover:to-[#A68BFF]/30 transition-all duration-300"
                          style={{
                            boxShadow: isPlaying
                              ? '0 8px 32px rgba(143, 211, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                              : '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          {isPlaying ? (
                            <Pause className="w-10 h-10 text-white/90" fill="currentColor" />
                          ) : (
                            <Play className="w-10 h-10 text-white/90 ml-1" fill="currentColor" />
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
                        <div className="flex-1 relative h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF]"
                            style={{ width: `${volume}%` }}
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
                        <span className="text-white/60 w-10 text-right">{volume}%</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center">
                  <p className="text-white/40">Select a therapy category to begin</p>
                </div>
              )}
            </div>

            {/* Right Column - Categories */}
            <div className="space-y-4">
              <h3 className="text-white/90 mb-4">Therapy Categories</h3>
              {musicCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MusicCategoryCard
                    category={category}
                    onSelect={() => handleSelectCategory(category)}
                    isActive={selectedCategory?.id === category.id}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

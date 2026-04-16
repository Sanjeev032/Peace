import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Screen, MusicTrack } from '../types';

interface SessionPlayerProps {
  onNavigate: (screen: Screen) => void;
  track: MusicTrack;
}

export function SessionPlayer({ onNavigate, track }: SessionPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio] = useState(new Audio());

  useEffect(() => {
    if (track) {
      audio.src = track.fileUrl;
      audio.load();
      setIsPlaying(true);
    }
  }, [track, audio]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(err => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-5 py-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="text-white/60 hover:text-white/90 transition-colors p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-24">
        {/* Background Blur Effect */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: isPlaying
              ? [
                  'radial-gradient(circle at 50% 40%, rgba(143, 211, 255, 0.1), transparent 60%)',
                  'radial-gradient(circle at 50% 40%, rgba(166, 139, 255, 0.1), transparent 60%)',
                  'radial-gradient(circle at 50% 40%, rgba(143, 211, 255, 0.1), transparent 60%)'
                ]
              : 'radial-gradient(circle at 50% 40%, rgba(143, 211, 255, 0.05), transparent 60%)'
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Session Visual */}
        <motion.div
          className="w-64 h-64 rounded-full mb-12 backdrop-blur-md bg-gradient-to-br from-[#8FD3FF]/20 to-[#A68BFF]/20 border border-white/10 flex items-center justify-center"
          animate={{
            scale: isPlaying ? [1, 1.05, 1] : 1,
            rotate: isPlaying ? 360 : 0
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
          }}
          style={{
            boxShadow: '0 20px 60px rgba(143, 211, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-[#8FD3FF]/30 to-[#A68BFF]/30 blur-2xl"
            animate={{
              opacity: isPlaying ? [0.5, 0.8, 0.5] : 0.3
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Session Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-white text-3xl font-serif mb-2">{track.title}</h1>
          <p className="text-white/60 uppercase tracking-widest text-xs font-bold">{track.category}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-white/40 text-xs font-medium font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/40 hover:text-white/90 transition-colors"
          >
            <SkipBack className="w-8 h-8" />
          </motion.button>

          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full w-24 h-24 flex items-center justify-center hover:bg-white/20 transition-all duration-300 shadow-2xl shadow-black/20"
            style={{
              inset: '0px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
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
            className="text-white/40 hover:text-white/90 transition-colors"
          >
            <SkipForward className="w-8 h-8" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}


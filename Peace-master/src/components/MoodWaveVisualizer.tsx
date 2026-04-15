import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mood } from './MoodBasedMusicTherapy';

interface MoodWaveVisualizerProps {
  isPlaying: boolean;
  mood: Mood;
  color: string;
}

export function MoodWaveVisualizer({ isPlaying, mood, color }: MoodWaveVisualizerProps) {
  const [bars, setBars] = useState<number[]>([]);

  // Different wave behaviors for different moods
  const moodBehaviors = {
    calm: { speed: 150, intensity: 0.3, variation: 0.2 },
    happy: { speed: 100, intensity: 0.6, variation: 0.4 },
    anxious: { speed: 80, intensity: 0.5, variation: 0.5 },
    sad: { speed: 200, intensity: 0.25, variation: 0.15 },
    tired: { speed: 250, intensity: 0.2, variation: 0.1 }
  };

  const behavior = moodBehaviors[mood];

  useEffect(() => {
    const barCount = 48;
    const initialBars = Array.from({ length: barCount }, () => Math.random() * 0.3 + 0.2);
    setBars(initialBars);
  }, [mood]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBars(prev =>
        prev.map((_, index) => {
          const position = index / prev.length;
          
          // Create wave-like distribution
          const wavePattern = Math.sin(position * Math.PI * 2 + Date.now() / 1000) * 0.3;
          const baseIntensity = behavior.intensity + wavePattern;
          const variation = Math.random() * behavior.variation;
          
          return Math.max(0.15, Math.min(1, baseIntensity + variation));
        })
      );
    }, behavior.speed);

    return () => clearInterval(interval);
  }, [isPlaying, mood, behavior]);

  // Choose visualization based on mood
  if (mood === 'calm' || mood === 'tired') {
    return <FlowingWaveVisualizer isPlaying={isPlaying} color={color} speed={behavior.speed} />;
  }

  if (mood === 'happy') {
    return <EnergeticBarsVisualizer isPlaying={isPlaying} bars={bars} color={color} />;
  }

  if (mood === 'anxious') {
    return <SoothingCirclesVisualizer isPlaying={isPlaying} color={color} />;
  }

  if (mood === 'sad') {
    return <GentleWaveVisualizer isPlaying={isPlaying} color={color} />;
  }

  return <FlowingWaveVisualizer isPlaying={isPlaying} color={color} speed={behavior.speed} />;
}

// Flowing Wave (Calm, Tired)
function FlowingWaveVisualizer({ isPlaying, color, speed }: { isPlaying: boolean; color: string; speed: number }) {
  const duration = speed / 50;

  return (
    <motion.div
      className="relative h-[280px] lg:h-[380px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center mb-6"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`moodWave-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>

        {/* Main wave */}
        <motion.path
          d="M0,200 Q250,180 500,200 T1000,200 L1000,400 L0,400 Z"
          fill={`url(#moodWave-${color})`}
          animate={{
            d: isPlaying
              ? [
                  'M0,200 Q250,180 500,200 T1000,200 L1000,400 L0,400 Z',
                  'M0,200 Q250,220 500,200 T1000,200 L1000,400 L0,400 Z',
                  'M0,200 Q250,180 500,200 T1000,200 L1000,400 L0,400 Z'
                ]
              : 'M0,250 Q250,250 500,250 T1000,250 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? duration : 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />

        {/* Secondary wave */}
        <motion.path
          d="M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z"
          fill={color}
          opacity={0.3}
          animate={{
            d: isPlaying
              ? [
                  'M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,240 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z'
                ]
              : 'M0,260 Q250,260 500,260 T1000,260 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? duration + 1 : 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      </svg>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </motion.div>
  );
}

// Energetic Bars (Happy)
function EnergeticBarsVisualizer({ isPlaying, bars, color }: { isPlaying: boolean; bars: number[]; color: string }) {
  return (
    <motion.div
      className="relative h-[280px] lg:h-[380px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 flex items-end justify-center gap-1 px-6 pb-8 mb-6"
    >
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="flex-1 rounded-full max-w-[10px]"
          style={{
            backgroundColor: color,
            opacity: 0.8
          }}
          animate={{
            height: isPlaying ? `${height * 75}%` : '20%',
            opacity: isPlaying ? 0.8 : 0.3
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent)`
        }}
        animate={{
          opacity: isPlaying ? [0.4, 0.7, 0.4] : 0.2
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}

// Soothing Circles (Anxious)
function SoothingCirclesVisualizer({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <motion.div
      className="relative h-[280px] lg:h-[380px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center mb-6"
    >
      <svg className="w-full h-full max-w-lg" viewBox="0 0 400 400">
        <defs>
          <radialGradient id={`anxiousGradient-${color}`}>
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Breathing circles */}
        {[1, 2, 3, 4].map((index) => (
          <motion.circle
            key={index}
            cx="200"
            cy="200"
            r={50 * index}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeOpacity={0.4}
            animate={{
              r: isPlaying ? [50 * index, 50 * index + 15, 50 * index] : 50 * index,
              strokeOpacity: isPlaying ? [0.4, 0.7, 0.4] : 0.2
            }}
            transition={{
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.15
            }}
          />
        ))}

        {/* Center glow */}
        <motion.circle
          cx="200"
          cy="200"
          r="30"
          fill={`url(#anxiousGradient-${color})`}
          animate={{
            r: isPlaying ? [30, 50, 30] : 30,
            opacity: isPlaying ? [0.5, 0.8, 0.5] : 0.3
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </motion.div>
  );
}

// Gentle Wave (Sad)
function GentleWaveVisualizer({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <motion.div
      className="relative h-[280px] lg:h-[380px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center mb-6"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`sadWave-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0.15} />
          </linearGradient>
        </defs>

        {/* Very gentle, slow wave */}
        <motion.path
          d="M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z"
          fill={`url(#sadWave-${color})`}
          animate={{
            d: isPlaying
              ? [
                  'M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,240 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,200 500,220 T1000,220 L1000,400 L0,400 Z'
                ]
              : 'M0,260 Q250,260 500,260 T1000,260 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? 6 : 2,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />

        {/* Subtle overlay wave */}
        <motion.path
          d="M0,240 Q250,220 500,240 T1000,240 L1000,400 L0,400 Z"
          fill={color}
          opacity={0.25}
          animate={{
            d: isPlaying
              ? [
                  'M0,240 Q250,220 500,240 T1000,240 L1000,400 L0,400 Z',
                  'M0,240 Q250,260 500,240 T1000,240 L1000,400 L0,400 Z',
                  'M0,240 Q250,220 500,240 T1000,240 L1000,400 L0,400 Z'
                ]
              : 'M0,270 Q250,270 500,270 T1000,270 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? 7 : 2,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </svg>

      {/* Soft glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 70%, ${color}20, transparent 60%)`
        }}
        animate={{
          opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.2
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}

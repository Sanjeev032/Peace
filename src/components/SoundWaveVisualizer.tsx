import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MusicCategory } from './MusicTherapy';

interface SoundWaveVisualizerProps {
  isPlaying: boolean;
  category: MusicCategory;
}

export function SoundWaveVisualizer({ isPlaying, category }: SoundWaveVisualizerProps) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Initialize bars based on wave type
    const barCount = category.waveType === 'circular' ? 32 : 48;
    const initialBars = Array.from({ length: barCount }, () => Math.random() * 0.3 + 0.2);
    setBars(initialBars);
  }, [category]);

  useEffect(() => {
    if (!isPlaying) return;

    // Simulate audio frequency changes with more variation
    const interval = setInterval(() => {
      setBars(prev =>
        prev.map((_, index) => {
          // Create more realistic frequency distribution
          const baseIntensity = category.waveType === 'bars' ? 0.6 : 0.4;
          
          // Simulate low, mid, high frequency ranges
          const position = index / prev.length;
          let frequencyMultiplier = 1;
          
          if (position < 0.3) {
            // Low frequencies - slower, steadier
            frequencyMultiplier = 0.7 + Math.sin(Date.now() / 500) * 0.2;
          } else if (position < 0.7) {
            // Mid frequencies - moderate variation
            frequencyMultiplier = 0.8 + Math.sin(Date.now() / 300) * 0.3;
          } else {
            // High frequencies - more energetic
            frequencyMultiplier = 0.6 + Math.sin(Date.now() / 200) * 0.4;
          }
          
          const variation = Math.random() * 0.3 * frequencyMultiplier;
          return Math.min(1, baseIntensity + variation);
        })
      );
    }, 80); // Faster update for smoother animation

    return () => clearInterval(interval);
  }, [isPlaying, category]);

  if (category.waveType === 'circular') {
    return <CircularWaveVisualizer isPlaying={isPlaying} bars={bars} color={category.color} />;
  }

  if (category.waveType === 'harmonic') {
    return <HarmonicWaveVisualizer isPlaying={isPlaying} color={category.color} />;
  }

  if (category.waveType === 'bars') {
    return <BarsWaveVisualizer isPlaying={isPlaying} bars={bars} color={category.color} />;
  }

  return <FlowingWaveVisualizer isPlaying={isPlaying} color={category.color} />;
}

// Flowing Wave Visualizer (for Ambient, Nature)
function FlowingWaveVisualizer({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <motion.div
      className="relative h-[300px] lg:h-[400px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated flowing waves */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A68BFF" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#A68BFF" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Wave 1 */}
        <motion.path
          d="M0,200 Q250,150 500,200 T1000,200 L1000,400 L0,400 Z"
          fill="url(#waveGradient1)"
          animate={{
            d: isPlaying
              ? [
                  'M0,200 Q250,150 500,200 T1000,200 L1000,400 L0,400 Z',
                  'M0,200 Q250,250 500,200 T1000,200 L1000,400 L0,400 Z',
                  'M0,200 Q250,150 500,200 T1000,200 L1000,400 L0,400 Z'
                ]
              : 'M0,250 Q250,250 500,250 T1000,250 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? 4 : 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />

        {/* Wave 2 */}
        <motion.path
          d="M0,220 Q250,170 500,220 T1000,220 L1000,400 L0,400 Z"
          fill="url(#waveGradient2)"
          animate={{
            d: isPlaying
              ? [
                  'M0,220 Q250,170 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,270 500,220 T1000,220 L1000,400 L0,400 Z',
                  'M0,220 Q250,170 500,220 T1000,220 L1000,400 L0,400 Z'
                ]
              : 'M0,260 Q250,260 500,260 T1000,260 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? 5 : 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />

        {/* Wave 3 (subtle overlay) */}
        <motion.path
          d="M0,240 Q250,190 500,240 T1000,240 L1000,400 L0,400 Z"
          fill="url(#waveGradient1)"
          opacity={0.3}
          animate={{
            d: isPlaying
              ? [
                  'M0,240 Q250,190 500,240 T1000,240 L1000,400 L0,400 Z',
                  'M0,240 Q250,290 500,240 T1000,240 L1000,400 L0,400 Z',
                  'M0,240 Q250,190 500,240 T1000,240 L1000,400 L0,400 Z'
                ]
              : 'M0,270 Q250,270 500,270 T1000,270 L1000,400 L0,400 Z'
          }}
          transition={{
            duration: isPlaying ? 6 : 1.5,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </svg>

      {/* Glass reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}

// Bars Wave Visualizer (for Binaural Beats)
function BarsWaveVisualizer({ isPlaying, bars, color }: { isPlaying: boolean; bars: number[]; color: string }) {
  return (
    <motion.div
      className="relative h-[300px] lg:h-[400px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex items-end justify-center gap-1 px-8 pb-8"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="flex-1 rounded-full max-w-[12px]"
          style={{
            background: `linear-gradient(to top, ${color}, ${color}80)`
          }}
          animate={{
            height: isPlaying ? `${height * 70}%` : '20%',
            opacity: isPlaying ? 0.8 : 0.3
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent)`
        }}
        animate={{
          opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.1
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

// Circular Wave Visualizer (for Glass Music)
function CircularWaveVisualizer({ isPlaying, bars, color }: { isPlaying: boolean; bars: number[]; color: string }) {
  const radius = 120;
  const centerX = 200;
  const centerY = 200;

  return (
    <motion.div
      className="relative h-[300px] lg:h-[400px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-md">
        <defs>
          <radialGradient id="circularGradient">
            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.2} />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={60}
          fill={`${color}20`}
          animate={{
            r: isPlaying ? [60, 80, 60] : 60,
            opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.2
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Circular bars */}
        {bars.map((height, index) => {
          const angle = (index / bars.length) * Math.PI * 2;
          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const barLength = isPlaying ? height * 60 : 20;
          const x2 = centerX + Math.cos(angle) * (radius + barLength);
          const y2 = centerY + Math.sin(angle) * (radius + barLength);

          return (
            <motion.line
              key={index}
              x1={x1}
              y1={y1}
              x2={x1}
              y2={y1}
              stroke={`url(#circularGradient)`}
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                x2: x2,
                y2: y2,
                opacity: isPlaying ? 0.8 : 0.3
              }}
              transition={{
                duration: 0.15,
                ease: 'easeOut'
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

// Harmonic Wave Visualizer (for 432 Hz)
function HarmonicWaveVisualizer({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <motion.div
      className="relative h-[300px] lg:h-[400px] rounded-[24px] overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Concentric circles */}
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="harmonicGradient">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </radialGradient>
        </defs>

        {[1, 2, 3, 4, 5].map((index) => (
          <motion.circle
            key={index}
            cx="200"
            cy="200"
            r={40 * index}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeOpacity={0.3}
            animate={{
              r: isPlaying ? [40 * index, 40 * index + 20, 40 * index] : 40 * index,
              strokeOpacity: isPlaying ? [0.3, 0.6, 0.3] : 0.2
            }}
            transition={{
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2
            }}
          />
        ))}

        {/* Center pulse */}
        <motion.circle
          cx="200"
          cy="200"
          r="20"
          fill={`url(#harmonicGradient)`}
          animate={{
            r: isPlaying ? [20, 40, 20] : 20,
            opacity: isPlaying ? [0.6, 0.9, 0.6] : 0.3
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </motion.div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { Screen } from '../App';

interface BreathingExerciseProps {
  onNavigate: (screen: Screen) => void;
}

type Phase = 'inhale' | 'hold' | 'exhale';

export function BreathingExercise({ onNavigate }: BreathingExerciseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(4);

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  const phaseText = {
    inhale: 'Breathe in',
    hold: 'Hold',
    exhale: 'Breathe out'
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Move to next phase
          setPhase(currentPhase => {
            if (currentPhase === 'inhale') return 'hold';
            if (currentPhase === 'hold') return 'exhale';
            return 'inhale';
          });
          return phaseDurations[phase === 'inhale' ? 'hold' : phase === 'hold' ? 'exhale' : 'inhale'];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, phase]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setPhase('inhale');
      setCountdown(4);
    }
    setIsPlaying(!isPlaying);
  };

  const orbScale = {
    inhale: 1.8,
    hold: 1.8,
    exhale: 1
  };

  const orbOpacity = {
    inhale: 0.8,
    hold: 0.8,
    exhale: 0.4
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
        <h2 className="text-white/90">Breathing Exercise</h2>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-24">
        {/* Breathing Orb */}
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center mb-12">
          {/* Outer glow ring */}
          <motion.div
            className="absolute w-full h-full rounded-full"
            animate={{
              scale: isPlaying ? orbScale[phase] : 1,
              opacity: isPlaying ? 0.2 : 0.1
            }}
            transition={{
              duration: phaseDurations[phase],
              ease: phase === 'exhale' ? 'easeInOut' : 'easeIn'
            }}
            style={{
              background: 'radial-gradient(circle, rgba(143, 211, 255, 0.3), transparent)'
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute w-[85%] h-[85%] rounded-full"
            animate={{
              scale: isPlaying ? orbScale[phase] : 1,
              opacity: isPlaying ? 0.4 : 0.2
            }}
            transition={{
              duration: phaseDurations[phase],
              ease: phase === 'exhale' ? 'easeInOut' : 'easeIn'
            }}
            style={{
              background: 'radial-gradient(circle, rgba(166, 139, 255, 0.4), transparent)'
            }}
          />

          {/* Inner orb */}
          <motion.div
            className="absolute w-[60%] h-[60%] rounded-full backdrop-blur-md bg-gradient-to-br from-[#8FD3FF]/40 to-[#A68BFF]/40 border border-white/20"
            animate={{
              scale: isPlaying ? orbScale[phase] : 1,
              opacity: isPlaying ? orbOpacity[phase] : 0.5
            }}
            transition={{
              duration: phaseDurations[phase],
              ease: phase === 'exhale' ? 'easeInOut' : 'easeIn'
            }}
            style={{
              boxShadow: '0 20px 60px rgba(143, 211, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            }}
          />

          {/* Center core */}
          <motion.div
            className="absolute w-[30%] h-[30%] rounded-full bg-gradient-to-br from-[#8FD3FF] to-[#A68BFF]"
            animate={{
              scale: isPlaying ? orbScale[phase] * 0.8 : 1,
              opacity: isPlaying ? 1 : 0.7
            }}
            transition={{
              duration: phaseDurations[phase],
              ease: phase === 'exhale' ? 'easeInOut' : 'easeIn'
            }}
            style={{
              boxShadow: '0 10px 40px rgba(143, 211, 255, 0.5)'
            }}
          />
        </div>

        {/* Phase Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-white mb-2">{phaseText[phase]}</h1>
            {isPlaying && (
              <motion.p
                key={countdown}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-white/60 text-3xl"
              >
                {countdown}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Play/Pause Button */}
        <motion.button
          onClick={handlePlayPause}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full w-20 h-20 flex items-center justify-center hover:bg-white/15 transition-all duration-300"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white/90" fill="currentColor" />
          ) : (
            <Play className="w-8 h-8 text-white/90 ml-1" fill="currentColor" />
          )}
        </motion.button>

        {/* Instruction */}
        {!isPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-center mt-8 max-w-sm"
          >
            Find a comfortable position. Press play to begin your breathing practice.
          </motion.p>
        )}
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Mood, moodConfigs } from './MoodBasedMusicTherapy';

interface MoodSelectionProps {
  onMoodSelect: (mood: Mood) => void;
}

export function MoodSelection({ onMoodSelect }: MoodSelectionProps) {
  const moods: Mood[] = ['calm', 'happy', 'anxious', 'sad', 'tired'];

  return (
    <div className="px-5 lg:px-12 pb-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-white/90 mb-3">How are you feeling?</h1>
          <p className="text-white/60 max-w-md mx-auto">
            Choose your current mood to receive personalized music therapy
          </p>
        </motion.div>

        {/* Mobile Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          {moods.map((mood, index) => {
            const config = moodConfigs[mood];
            return (
              <motion.button
                key={mood}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onMoodSelect(mood)}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[24px] p-6 hover:bg-white/15 transition-all duration-300 text-center"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="text-5xl mb-3">{config.emoji}</div>
                <h3 className="text-white/90 mb-1">{config.label}</h3>
                <p className="text-white/60 text-sm">{config.description}</p>

                {/* Color indicator */}
                <div className="mt-4 flex justify-center">
                  <div
                    className="w-16 h-1 rounded-full"
                    style={{ backgroundColor: config.solidColor }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {moods.map((mood, index) => {
            const config = moodConfigs[mood];
            return (
              <motion.button
                key={mood}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onMoodSelect(mood)}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[24px] p-8 hover:bg-white/15 transition-all duration-300 text-center"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="text-6xl mb-4">{config.emoji}</div>
                <h3 className="text-white/90 mb-2">{config.label}</h3>
                <p className="text-white/60 text-sm mb-4">{config.description}</p>

                {/* Color indicator */}
                <div className="flex justify-center">
                  <motion.div
                    className="w-20 h-1 rounded-full"
                    style={{ backgroundColor: config.solidColor }}
                    whileHover={{
                      boxShadow: `0 0 12px ${config.solidColor}80`
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/40 text-center mt-8 text-sm"
        >
          There's no wrong answer — just choose what feels right
        </motion.p>
      </div>
    </div>
  );
}

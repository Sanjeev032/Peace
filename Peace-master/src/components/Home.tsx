import { motion } from 'motion/react';
import { Wind, BookOpen, Heart, TrendingUp, Music2 } from 'lucide-react';
import { Screen } from '../App';
import { GlassCard } from './GlassCard';
import { QuickToolButton } from './QuickToolButton';

interface HomeProps {
  onNavigate: (screen: Screen, sessionTitle?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const moods = [
    { emoji: '😌', label: 'Calm', color: '#8FD3FF' },
    { emoji: '😊', label: 'Happy', color: '#A68BFF' },
    { emoji: '😰', label: 'Anxious', color: '#FFB38F' },
    { emoji: '😔', label: 'Sad', color: '#8FB3FF' }
  ];

  const sessions = [
    { title: 'Guided Calm', duration: '10 min', description: 'Ease into tranquility' },
    { title: 'Sleep Drift', duration: '20 min', description: 'Deep rest meditation' },
    { title: 'Grounding', duration: '5 min', description: 'Return to the present' }
  ];

  return (
    <div className="relative z-10">
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen px-5 py-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-white mb-2 tracking-wide">Peace</h1>
            <p className="text-white/60">Calm your mind • Track your mood</p>
          </div>

          {/* Animated Background Orb */}
          <motion.div
            className="relative h-[200px] mb-10 rounded-[24px] overflow-hidden"
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(143, 211, 255, 0.15), rgba(166, 139, 255, 0.15))',
                'radial-gradient(circle at 70% 50%, rgba(166, 139, 255, 0.15), rgba(143, 211, 255, 0.15))',
                'radial-gradient(circle at 30% 50%, rgba(143, 211, 255, 0.15), rgba(166, 139, 255, 0.15))'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8FD3FF]/30 to-[#A68BFF]/30 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          {/* Mood Tracker */}
          <div className="mb-8">
            <h2 className="text-white/90 mb-4">How are you feeling?</h2>
            <div className="grid grid-cols-2 gap-3">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                  style={{
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                  }}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-white/80">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Suggested Sessions */}
          <div className="mb-8">
            <h2 className="text-white/90 mb-4">Suggested for you</h2>
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <GlassCard
                    onClick={() => onNavigate('session', session.title)}
                    className="p-5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white/90 mb-1">{session.title}</h3>
                        <p className="text-white/50">{session.description}</p>
                      </div>
                      <div className="text-white/60 ml-4 whitespace-nowrap">{session.duration}</div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h2 className="text-white/90 mb-4">Quick tools</h2>
            <div className="flex gap-3">
              <QuickToolButton
                icon={<Wind className="w-6 h-6" />}
                label="Breath"
                onClick={() => onNavigate('breathing')}
              />
              <QuickToolButton
                icon={<BookOpen className="w-6 h-6" />}
                label="Journal"
                onClick={() => onNavigate('journal')}
              />
              <QuickToolButton
                icon={<Music2 className="w-6 h-6" />}
                label="Music"
                onClick={() => onNavigate('mood-music-therapy')}
              />
            </div>
          </div>

          {/* View History Link */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => onNavigate('mood-history')}
            className="mt-6 w-full py-4 text-[#8FD3FF] flex items-center justify-center gap-2 hover:text-[#A68BFF] transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            View mood history
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-white mb-2 tracking-wide">Peace</h1>
              <p className="text-white/60">Calm your mind • Track your mood</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-8">
                {/* Animated Background Hero */}
                <motion.div
                  className="relative h-[280px] rounded-[24px] overflow-hidden"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 50%, rgba(143, 211, 255, 0.15), rgba(166, 139, 255, 0.15))',
                      'radial-gradient(circle at 70% 50%, rgba(166, 139, 255, 0.15), rgba(143, 211, 255, 0.15))',
                      'radial-gradient(circle at 30% 50%, rgba(143, 211, 255, 0.15), rgba(166, 139, 255, 0.15))'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center">
                    <motion.div
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-[#8FD3FF]/30 to-[#A68BFF]/30 blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>

                {/* Suggested Sessions */}
                <div>
                  <h2 className="text-white/90 mb-5">Suggested for you</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {sessions.map((session, index) => (
                      <motion.div
                        key={session.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      >
                        <GlassCard
                          onClick={() => onNavigate('session', session.title)}
                          className="p-6 cursor-pointer h-full"
                        >
                          <h3 className="text-white/90 mb-2">{session.title}</h3>
                          <p className="text-white/50 mb-4">{session.description}</p>
                          <div className="text-white/60">{session.duration}</div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Mood Tracker */}
                <div>
                  <h2 className="text-white/90 mb-5">How are you feeling?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {moods.map((mood, index) => (
                      <motion.button
                        key={mood.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                        style={{
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                        }}
                      >
                        <div className="text-4xl mb-2">{mood.emoji}</div>
                        <div className="text-white/80">{mood.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quick Tools */}
                <div>
                  <h2 className="text-white/90 mb-5">Quick tools</h2>
                  <div className="space-y-3">
                    <QuickToolButton
                      icon={<Wind className="w-6 h-6" />}
                      label="Breath"
                      onClick={() => onNavigate('breathing')}
                      fullWidth
                    />
                    <QuickToolButton
                      icon={<BookOpen className="w-6 h-6" />}
                      label="Journal"
                      onClick={() => onNavigate('journal')}
                      fullWidth
                    />
                    <QuickToolButton
                      icon={<Music2 className="w-6 h-6" />}
                      label="Music"
                      onClick={() => onNavigate('mood-music-therapy')}
                      fullWidth
                    />
                  </div>
                </div>

                {/* View History */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => onNavigate('mood-history')}
                  className="w-full py-4 text-[#8FD3FF] flex items-center justify-center gap-2 hover:text-[#A68BFF] transition-colors backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] hover:bg-white/10"
                >
                  <TrendingUp className="w-5 h-5" />
                  View mood history
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
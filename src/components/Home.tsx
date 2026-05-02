import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wind, BookOpen, Heart, TrendingUp, Music2, Sparkles, Loader2, ShieldCheck, LogOut } from 'lucide-react';
import { fetchMoodConfigs, fetchMusicByMood } from '../services/api';
import { Screen, MusicTrack, User } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen, track?: MusicTrack) => void;
  user: User | null;
  onLogout: () => void;
}

export function Home({ onNavigate, user, onLogout }: HomeProps) {
  const [moodConfigs, setMoodConfigs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const configs = await fetchMoodConfigs();
        setMoodConfigs(configs);
      } catch (error) {
        console.error('Failed to load mood configs', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConfigs();
  }, []);

  const handleStartDailySession = async () => {
    try {
      setIsLoading(true);
      const tracks = await fetchMusicByMood('calm');
      if (tracks && tracks.length > 0) {
        onNavigate('player', tracks[0]);
      }
    } catch (error) {
      console.error('Failed to start daily session', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = moodConfigs.map(config => ({
    id: config.id,
    emoji: config.emoji,
    label: config.label,
    color: config.solidColor,
    description: config.description
  }));

  const quickTools = [
    { icon: <Wind className="w-6 h-6" />, label: 'Breath', route: 'breathing' },
    { icon: <BookOpen className="w-6 h-6" />, label: 'Journal', route: 'journal' },
    { icon: <Music2 className="w-6 h-6" />, label: 'Therapy', route: 'music-therapy' },
    { icon: <Sparkles className="w-6 h-6" />, label: 'Quiz', route: 'quiz' },
  ];

  return (
    <div className="relative z-10 font-sans selection:bg-[#8BA888]/20">
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen px-5 py-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 mt-4">
             <div className="text-left">
                <h1 className="text-[#2D2D2D] text-3xl mb-1 font-serif tracking-tight">Peace</h1>
                <p className="text-[#5C5C5C] text-xs font-medium opacity-60">Welcome back, {user?.email.split('@')[0]}</p>
             </div>
             <button onClick={onLogout} className="p-3 bg-white/50 border border-black/5 rounded-2xl text-[#C17F5B]">
                <LogOut className="w-5 h-5" />
             </button>
          </div>

          {/* Biophilic Hero Card */}
          <motion.div
            className="relative h-[250px] mb-10 rounded-[40px] overflow-hidden shadow-2xl shadow-[#8BA888]/10"
            animate={{
              background: [
                'radial-gradient(circle at 20% 40%, rgba(139, 168, 136, 0.15), rgba(245, 242, 237, 1))',
                'radial-gradient(circle at 80% 60%, rgba(193, 127, 91, 0.1), rgba(245, 242, 237, 1))',
                'radial-gradient(circle at 20% 40%, rgba(139, 168, 136, 0.15), rgba(245, 242, 237, 1))'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 backdrop-blur-[2px] bg-white/30 border border-white/60 rounded-[40px] flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-[#2D2D2D] text-2xl mb-3 font-serif font-medium">Begin your journey</h3>
              <p className="text-[#5C5C5C] text-sm mb-6 max-w-[200px]">Tailored soundscapes for your state</p>
              <button 
                onClick={handleStartDailySession}
                disabled={isLoading}
                className="btn-sage scale-100 disabled:opacity-50"
              >
                 {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
                 {isLoading ? 'Loading...' : 'Start Therapy'}
              </button>
            </div>
          </motion.div>

          {/* Quick Tools */}
          <div className="mb-10">
            <h2 className="text-[#2D2D2D] text-xl mb-5 font-serif px-1">Daily Practices</h2>
            <div className="grid grid-cols-4 gap-3">
              {quickTools.map((tool) => (
                <motion.button
                  key={tool.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(tool.route as any)}
                  className="biophilic-card p-3 flex flex-col items-center justify-center aspect-square"
                >
                  <div className="text-[#8BA888] mb-1">{tool.icon}</div>
                  <span className="text-[#2D2D2D] text-[10px] font-bold uppercase tracking-widest">{tool.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="mb-8">
            <h2 className="text-[#2D2D2D] text-xl mb-5 font-serif px-1">Explore Scents</h2>
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onNavigate('music-therapy')}
                  className="biophilic-card p-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{cat.emoji}</div>
                    <div className="text-left">
                      <div className="text-[#2D2D2D] font-serif font-semibold text-lg leading-none mb-1">{cat.label}</div>
                      <div className="text-[#5C5C5C] text-sm opacity-70">{cat.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {user?.role === 'admin' && (
            <motion.button
              whileTap={{ scale: 0.99 }}
              onClick={() => onNavigate('admin')}
              className="w-full py-5 bg-[#2D2D2D] text-[#8BA888] rounded-[24px] flex items-center justify-center gap-3 shadow-xl mb-4"
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="font-semibold tracking-wide uppercase text-xs">Admin Dashboard</span>
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => onNavigate('mood-history')}
            className="w-full py-5 border-2 border-[#2D2D2D]/10 text-[#2D2D2D] rounded-[24px] flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-5 h-5 opacity-40" />
            <span className="font-semibold tracking-wide">Journal History</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Nav Header */}
            <div className="flex items-center justify-between mb-16 px-4">
              <div className="flex items-center gap-8">
                <h1 className="text-[#2D2D2D] text-6xl mb-2 font-serif tracking-tighter">Peace</h1>
                <div className="h-12 w-[1px] bg-black/5" />
                <p className="text-[#5C5C5C] text-lg font-medium opacity-60">Hello, {user?.email.split('@')[0]}.</p>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => onNavigate('mood-history')} className="px-6 py-2 rounded-full border border-[#2D2D2D]/10 hover:bg-[#2D2D2D]/5 transition-all font-medium text-[#2D2D2D]">History</button>
                 {user?.role === 'admin' && (
                   <button onClick={() => onNavigate('admin')} className="px-6 py-2 rounded-full bg-[#8BA888]/10 text-[#8BA888] hover:bg-[#8BA888]/20 transition-all font-bold flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4" /> Admin Panel
                   </button>
                 )}
                 <button onClick={onLogout} className="px-6 py-2 rounded-full bg-[#2D2D2D] text-white hover:bg-black transition-all font-medium shadow-lg shadow-black/10 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 flex flex-col gap-8">
                <motion.div
                  className="relative h-[480px] rounded-[56px] overflow-hidden shadow-2xl shadow-[#8BA888]/5"
                  animate={{
                    background: [
                      'radial-gradient(circle at 10% 10%, rgba(139, 168, 136, 0.15), rgba(253, 251, 247, 1))',
                      'radial-gradient(circle at 90% 90%, rgba(193, 127, 91, 0.1), rgba(253, 251, 247, 1))'
                    ]
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                >
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                     <div className="max-w-lg">
                        <span className="inline-block px-4 py-1.5 bg-[#8BA888]/10 text-[#8BA888] rounded-full text-sm font-bold tracking-widest uppercase mb-6">Daily Recommendation</span>
                        <h2 className="text-[#2D2D2D] text-6xl font-serif mb-6 leading-[1.1]">The art of being <br/> <span className="italic text-[#8BA888]">still</span>.</h2>
                        <div className="flex gap-4">
                          <button 
                            onClick={handleStartDailySession}
                            disabled={isLoading}
                            className="btn-sage px-10 py-4 text-lg disabled:opacity-50"
                          >
                            {isLoading ? 'Preparing...' : 'Start Daily Session'}
                          </button>
                          <button onClick={() => onNavigate('quiz')} className="px-10 py-4 border-2 border-[#2D2D2D]/10 rounded-full font-bold hover:bg-white/50 transition-all flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#8BA888]" /> Take Mood Quiz
                          </button>
                        </div>
                     </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="biophilic-card p-10 flex flex-col justify-between h-[300px]">
                        <Wind className="w-12 h-12 text-[#8BA888] mb-4" />
                        <div>
                          <h3 className="text-3xl font-serif text-[#2D2D2D] mb-2">Deep Breath</h3>
                          <button onClick={() => onNavigate('breathing')} className="font-bold text-[#8BA888] underline underline-offset-8">Open Breath Master</button>
                        </div>
                    </div>
                    <div className="biophilic-card p-10 flex flex-col justify-between h-[300px]">
                        <BookOpen className="w-12 h-12 text-[#C17F5B] mb-4" />
                        <div>
                          <h3 className="text-3xl font-serif text-[#2D2D2D] mb-2">Mind Journal</h3>
                          <button onClick={() => onNavigate('journal')} className="font-bold text-[#C17F5B] underline underline-offset-8">Write Entry</button>
                        </div>
                    </div>
                </div>
              </div>

              <div className="col-span-4 flex flex-col gap-8">
                  <div className="biophilic-card p-8 h-full">
                      <h3 className="text-2xl font-serif mb-8 text-[#2D2D2D] border-b border-black/5 pb-4">Music Therapy</h3>
                      <div className="space-y-4">
                        {categories.map((cat) => (
                          <div key={cat.label} 
                            onClick={() => onNavigate('music-therapy')}
                            className="group cursor-pointer flex items-center gap-4 p-4 rounded-[24px] hover:bg-white/40 transition-all border border-transparent hover:border-white/60"
                          >
                             <div className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</div>
                             <div>
                                <div className="font-bold text-[#2D2D2D] group-hover:text-[#8BA888] transition-colors">{cat.label}</div>
                                <div className="text-xs text-[#5C5C5C] font-semibold">{cat.description}</div>
                             </div>
                          </div>
                        ))}
                      </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
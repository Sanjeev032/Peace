import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Edit2, Trash2, X, Check, 
  LayoutDashboard, Music, Settings, LogOut, 
  ArrowLeft, Loader2, Save, MoreVertical
} from 'lucide-react';
import { fetchMoodConfigs, fetchAllMusic } from '../services/api';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'music' | 'moods'>('music');
  const [isLoading, setIsLoading] = useState(true);
  const [music, setMusic] = useState<any[]>([]);
  const [moodConfigs, setMoodConfigs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token') || '';
        const moodsResp = await fetchMoodConfigs();
        setMoodConfigs(moodsResp);
        
        const musicResp = await fetchAllMusic(token);
        setMusic(musicResp);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);


  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-[#2D2D2D]/5 p-8 flex flex-col gap-10">
        <div>
           <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-[#8BA888] rounded-xl flex items-center justify-center text-white">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif text-[#2D2D2D]">Peace Admin</h2>
           </div>

           <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('music')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${activeTab === 'music' ? 'bg-[#8BA888]/10 text-[#8BA888]' : 'text-[#5C5C5C] hover:bg-stone-50'}`}
              >
                <Music className="w-5 h-5" />
                Music Library
              </button>
              <button 
                onClick={() => setActiveTab('moods')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${activeTab === 'moods' ? 'bg-[#8BA888]/10 text-[#8BA888]' : 'text-[#5C5C5C] hover:bg-stone-50'}`}
              >
                <Settings className="w-5 h-5" />
                Mood Themes
              </button>
           </nav>
        </div>

        <div className="mt-auto flex flex-col gap-4">
           <button 
             onClick={onBack}
             className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#5C5C5C] hover:bg-red-50 hover:text-red-500 transition-all font-medium"
           >
             <LogOut className="w-5 h-5" />
             Exit Admin
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-serif text-[#2D2D2D] mb-2">
                {activeTab === 'music' ? 'Music Management' : 'Mood Configuration'}
              </h1>
              <p className="text-[#5C5C5C]">Manage the dynamic content of your peace sanctuary.</p>
            </div>
            <button className="btn-sage">
              <Plus className="w-5 h-5" /> Add {activeTab === 'music' ? 'Track' : 'Mood'}
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-[#8BA888]" />
            </div>
          ) : (
            <div className="grid gap-4">
              {activeTab === 'music' ? (
                music.map((track) => (
                  <div key={track._id} className="biophilic-card p-6 flex items-center justify-between hover:border-[#8BA888]/30 transition-colors">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#F5F2ED] rounded-2xl flex items-center justify-center text-2xl">
                        🎵
                      </div>
                      <div>
                        <h4 className="text-lg font-serif text-[#2D2D2D]">{track.title}</h4>
                        <p className="text-[#5C5C5C] text-sm">{track.category} • {track.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(track)} className="p-3 text-[#5C5C5C] hover:bg-stone-100 rounded-xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
               moodConfigs.map((config: any) => (
                  <div key={config._id} className="biophilic-card p-6 flex items-center justify-between hover:border-[#C17F5B]/30 transition-colors">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#F5F2ED] rounded-2xl flex items-center justify-center text-4xl">
                        {config.emoji}
                      </div>
                      <div>
                        <h4 className="text-lg font-serif text-[#2D2D2D]">{config.label}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.solidColor }} />
                           <p className="text-[#5C5C5C] text-xs font-mono">{config.solidColor}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(config)} className="p-3 text-[#5C5C5C] hover:bg-stone-100 rounded-xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}

            </div>
          )}
        </div>
      </div>

      {/* Edit Modal (Mockup) */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsEditing(false)}
               className="absolute inset-0 bg-[#2D2D2D]/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
             >
                <div className="p-10">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-3xl font-serif text-[#2D2D2D]">Edit {activeTab === 'music' ? 'Track' : 'Mood'}</h3>
                      <button onClick={() => setIsEditing(false)} className="p-2 text-[#5C5C5C] hover:bg-stone-100 rounded-full transition-all">
                        <X className="w-6 h-6" />
                      </button>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Title / Label</label>
                        <input 
                          type="text" 
                          defaultValue={selectedItem?.title || selectedItem?.label}
                          className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Description</label>
                        <textarea 
                          defaultValue={selectedItem?.description}
                          className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all h-32 resize-none"
                        />
                      </div>
                   </div>

                   <div className="mt-10 flex gap-4">
                      <button onClick={() => setIsEditing(false)} className="flex-1 py-4 px-6 border border-[#2D2D2D]/10 rounded-full font-bold text-[#5C5C5C] hover:bg-stone-50 transition-all">
                        Cancel
                      </button>
                      <button className="flex-2 btn-sage py-4">
                        <Save className="w-5 h-5" /> Save Changes
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

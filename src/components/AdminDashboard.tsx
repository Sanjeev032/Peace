import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Edit2, Trash2, X, Check, 
  LayoutDashboard, Music, Settings, LogOut, 
  ArrowLeft, Loader2, Save, MoreVertical, AlertCircle, Sparkles
} from 'lucide-react';
import { 
  fetchMoodConfigs, fetchAllMusic, 
  createMusicTrack, updateMusicTrack, deleteMusicTrack,
  createMoodConfig, updateMoodConfig, deleteMoodConfig,
  fetchQuiz, createQuizQuestion, updateQuizQuestion, deleteQuizQuestion
} from '../services/api';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'music' | 'moods' | 'quiz'>('music');
  const [isLoading, setIsLoading] = useState(true);
  const [music, setMusic] = useState<any[]>([]);
  const [moodConfigs, setMoodConfigs] = useState<any[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token') || '';
        const moodsResp = await fetchMoodConfigs();
        setMoodConfigs(moodsResp);
        
        const musicResp = await fetchAllMusic(token);
        setMusic(musicResp);

        const quizResp = await fetchQuiz();
        setQuizQuestions(quizResp);
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
    setFormData(item);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAddInitiate = () => {
    setSelectedItem(null);
    if (activeTab === 'music') {
      setFormData({ title: '', description: '', duration: '', category: 'Meditation', moods: [], fileUrl: '' });
    } else if (activeTab === 'moods') {
      setFormData({ id: '', label: '', emoji: '', solidColor: '#8BA888', gradient: '', description: '' });
    } else {
      setFormData({ questionText: '', order: quizQuestions.length + 1, options: [{ text: '', moodImpact: 'Calm', scoreValue: 1 }] });
    }
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this?')) return;
    
    try {
      const token = localStorage.getItem('token') || '';
      if (activeTab === 'music') {
        await deleteMusicTrack(id, token);
        setMusic(music.filter(m => m._id !== id));
      } else if (activeTab === 'moods') {
        await deleteMoodConfig(id, token);
        setMoodConfigs(moodConfigs.filter(m => m.id !== id));
      } else {
        await deleteQuizQuestion(id, token);
        setQuizQuestions(quizQuestions.filter(q => q._id !== id));
      }
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      const token = localStorage.getItem('token') || '';
      if (activeTab === 'music') {
        if (isAdding) {
          const newTrack = await createMusicTrack(formData, token);
          setMusic([...music, newTrack]);
        } else {
          const updated = await updateMusicTrack(selectedItem._id, formData, token);
          setMusic(music.map(m => m._id === selectedItem._id ? updated : m));
        }
      } else if (activeTab === 'moods') {
        if (isAdding) {
          const newConfig = await createMoodConfig(formData, token);
          setMoodConfigs([...moodConfigs, newConfig]);
        } else {
          const updated = await updateMoodConfig(selectedItem.id, formData, token);
          setMoodConfigs(moodConfigs.map(m => m.id === selectedItem.id ? updated : m));
        }
      } else {
        if (isAdding) {
          const newQuestion = await createQuizQuestion(formData, token);
          setQuizQuestions([...quizQuestions, newQuestion]);
        } else {
          const updated = await updateQuizQuestion(selectedItem._id, formData, token);
          setQuizQuestions(quizQuestions.map(q => q._id === selectedItem._id ? updated : q));
        }
      }
      setIsEditing(false);
    } catch (err: any) {
      setFormError(err.message);
    }
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
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${activeTab === 'quiz' ? 'bg-[#8BA888]/10 text-[#8BA888]' : 'text-[#5C5C5C] hover:bg-stone-50'}`}
              >
                <Sparkles className="w-5 h-5" />
                Mood Quiz
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
                {activeTab === 'music' ? 'Music Management' : activeTab === 'moods' ? 'Mood Configuration' : 'Quiz Management'}
              </h1>
              <p className="text-[#5C5C5C]">Manage the dynamic content of your peace sanctuary.</p>
            </div>
            <button 
              onClick={handleAddInitiate}
              className="btn-sage"
            >
              <Plus className="w-5 h-5" /> Add {activeTab === 'music' ? 'Track' : activeTab === 'moods' ? 'Mood' : 'Question'}
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
                      <button 
                        onClick={() => handleDelete(track._id)}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : activeTab === 'moods' ? (
                moodConfigs.map((config: any) => (
                  <div key={config.id || config._id} className="biophilic-card p-6 flex items-center justify-between hover:border-[#C17F5B]/30 transition-colors">
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
                      <button 
                        onClick={() => handleDelete(config.id)}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                quizQuestions.map((q: any) => (
                  <div key={q._id} className="biophilic-card p-6 flex items-center justify-between hover:border-[#8BA888]/30 transition-colors">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-[#F5F2ED] rounded-2xl flex items-center justify-center font-bold text-[#8BA888]">
                        Q{q.order}
                      </div>
                      <div>
                        <h4 className="text-lg font-serif text-[#2D2D2D]">{q.questionText}</h4>
                        <p className="text-[#5C5C5C] text-sm">{q.options.length} options</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(q)} className="p-3 text-[#5C5C5C] hover:bg-stone-100 rounded-xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(q._id)}
                        className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
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
                      <h3 className="text-3xl font-serif text-[#2D2D2D]">
                        {isAdding ? 'Add' : 'Edit'} {activeTab === 'music' ? 'Track' : activeTab === 'moods' ? 'Mood' : 'Question'}
                      </h3>
                      <button onClick={() => setIsEditing(false)} className="p-2 text-[#5C5C5C] hover:bg-stone-100 rounded-full transition-all">
                        <X className="w-6 h-6" />
                      </button>
                   </div>
                   
                   <form onSubmit={handleSave} className="space-y-6">
                      {formError && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-sm font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> {formError}
                        </div>
                      )}

                      {activeTab === 'quiz' ? (
                        <>
                          <div className="grid grid-cols-4 gap-6">
                            <div className="space-y-2 col-span-3">
                              <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Question Text</label>
                              <input 
                                type="text" 
                                required
                                value={formData.questionText}
                                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                                className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Order</label>
                              <input 
                                type="number" 
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                                className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1 flex items-center justify-between">
                              <span>Options</span>
                              <button 
                                type="button" 
                                onClick={() => setFormData({ ...formData, options: [...formData.options, { text: '', moodImpact: 'Calm', scoreValue: 1 }] })}
                                className="text-[#8BA888] hover:text-[#7A9777] font-bold lowercase"
                              >
                                + Add Option
                              </button>
                            </label>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                              {formData.options?.map((opt: any, idx: number) => (
                                <div key={idx} className="flex gap-3 items-start">
                                  <input 
                                    placeholder="Option text"
                                    value={opt.text}
                                    onChange={(e) => {
                                      const newOpts = [...formData.options];
                                      newOpts[idx].text = e.target.value;
                                      setFormData({ ...formData, options: newOpts });
                                    }}
                                    className="flex-1 px-4 py-3 bg-[#F5F2ED] rounded-xl text-sm outline-none"
                                  />
                                  <select 
                                    value={opt.moodImpact}
                                    onChange={(e) => {
                                      const newOpts = [...formData.options];
                                      newOpts[idx].moodImpact = e.target.value;
                                      setFormData({ ...formData, options: newOpts });
                                    }}
                                    className="w-32 px-3 py-3 bg-[#F5F2ED] rounded-xl text-sm outline-none"
                                  >
                                    <option value="Calm">Calm</option>
                                    <option value="Energetic">Energetic</option>
                                    <option value="Reflective">Reflective</option>
                                    <option value="Anxious">Anxious</option>
                                    <option value="Sad">Sad</option>
                                  </select>
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      const newOpts = formData.options.filter((_: any, i: number) => i !== idx);
                                      setFormData({ ...formData, options: newOpts });
                                    }}
                                    className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">
                                {activeTab === 'music' ? 'Track Title' : 'Mood ID (Unique)'}
                              </label>
                              <input 
                                type="text" 
                                required
                                value={activeTab === 'music' ? formData.title : formData.id}
                                onChange={(e) => setFormData({ ...formData, [activeTab === 'music' ? 'title' : 'id']: e.target.value })}
                                className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">
                                {activeTab === 'music' ? 'Category' : 'Label'}
                              </label>
                              <input 
                                type="text" 
                                required
                                value={activeTab === 'music' ? formData.category : formData.label}
                                onChange={(e) => setFormData({ ...formData, [activeTab === 'music' ? 'category' : 'label']: e.target.value })}
                                className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                              />
                            </div>
                          </div>

                          {activeTab === 'music' ? (
                            <>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Duration (e.g. 5:00)</label>
                                  <input 
                                    type="text" 
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">File URL</label>
                                  <input 
                                    type="url" 
                                    required
                                    value={formData.fileUrl}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Moods (Comma separated)</label>
                                 <input 
                                   type="text" 
                                   value={Array.isArray(formData.moods) ? formData.moods.join(', ') : formData.moods}
                                   onChange={(e) => setFormData({ ...formData, moods: e.target.value.split(',').map((s: string) => s.trim()) })}
                                   className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                                 />
                              </div>
                            </>
                          ) : (
                            <div className="grid grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Emoji</label>
                                <input 
                                  type="text" 
                                  value={formData.emoji}
                                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                                  className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-center text-2xl focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Solid Color</label>
                                <input 
                                  type="color" 
                                  value={formData.solidColor}
                                  onChange={(e) => setFormData({ ...formData, solidColor: e.target.value })}
                                  className="w-full h-[60px] p-1 bg-[#F5F2ED] rounded-[20px] cursor-pointer"
                                />
                              </div>
                               <div className="space-y-2 col-span-1">
                                <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Gradient CSS</label>
                                <input 
                                  type="text" 
                                  placeholder="linear-gradient(...)"
                                  value={formData.gradient}
                                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                  className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-xs font-mono focus:ring-2 focus:ring-[#8BA888] outline-none transition-all"
                                />
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-[#5C5C5C] uppercase tracking-widest ml-1">Description</label>
                            <textarea 
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-6 py-4 bg-[#F5F2ED] rounded-[20px] text-[#2D2D2D] focus:ring-2 focus:ring-[#8BA888] outline-none transition-all h-32 resize-none"
                            />
                          </div>
                        </>
                      )}

                      <div className="mt-10 flex gap-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 px-6 border border-[#2D2D2D]/10 rounded-full font-bold text-[#5C5C5C] hover:bg-stone-50 transition-all">
                          Cancel
                        </button>
                        <button type="submit" className="flex-1 btn-sage py-4 flex items-center justify-center gap-2">
                          <Save className="w-5 h-5" /> {isAdding ? 'Create' : 'Save Changes'}
                        </button>
                      </div>
                   </form>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

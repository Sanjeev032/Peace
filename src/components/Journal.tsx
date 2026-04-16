import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Check, Loader2, AlertCircle } from 'lucide-react';
import { Screen } from '../types';
import { createJournal } from '../services/api';

interface JournalProps {
  onNavigate: (screen: Screen) => void;
}

export function Journal({ onNavigate }: JournalProps) {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      setIsSaving(true);
      setError(null);
      const token = localStorage.getItem('token') || '';
      
      if (!token) {
        setError('Please login to save your journal entries');
        return;
      }

      await createJournal(text, token);
      setSaved(true);
      setText(''); // Clear after save
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col font-sans">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#5C5C5C]/60 hover:text-[#2D2D2D] transition-colors p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-[#2D2D2D] font-serif font-bold">Journal</h2>
          <div className="w-10" />
        </div>

        {/* Private Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-[#5C5C5C]/50 mb-6"
        >
          <Lock className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Safe Space • Stored Securely</span>
        </motion.div>
      </div>

      {/* Writing Area */}
      <div className="flex-1 px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full flex flex-col"
        >
          {error && (
            <div className="bg-[#C17F5B]/10 border border-[#C17F5B]/20 rounded-2xl p-4 mb-6 flex items-center gap-3 text-[#C17F5B]">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Let it all out... what's on your mind today?"
            disabled={isSaving}
            className="w-full h-full min-h-[400px] bg-transparent text-[#2D2D2D] placeholder:text-[#5C5C5C]/30 resize-none focus:outline-none font-serif text-xl disabled:opacity-50"
            style={{
              lineHeight: '2.2'
            }}
          />
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-8 backdrop-blur-xl bg-[#FDFBF7]/80 border-t border-[#2D2D2D]/5 flex justify-center">
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!text.trim() || isSaving}
          className={`w-full max-w-md py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg ${
            text.trim() && !isSaving
              ? 'bg-[#8BA888] text-white shadow-xl shadow-[#8BA888]/20 hover:bg-[#7A9777]'
              : 'bg-[#2D2D2D]/5 text-[#5C5C5C]/30 cursor-not-allowed'
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Cataloging...
            </>
          ) : saved ? (
            <>
              <Check className="w-6 h-6" />
              Manifested
            </>
          ) : (
             <>
               <ArrowLeft className="w-5 h-5 opacity-0" />
               Save Thought Entry
               <Check className="w-5 h-5 opacity-40" />
             </>
          )}
        </motion.button>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import { Screen } from '../App';

interface JournalProps {
  onNavigate: (screen: Screen) => void;
}

export function Journal({ onNavigate }: JournalProps) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to local storage or backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-white/60 hover:text-white/90 transition-colors p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white/90">Journal</h2>
          <div className="w-10" />
        </div>

        {/* Private Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 text-white/50 mb-6"
        >
          <Lock className="w-4 h-4" />
          <span>Private • Stored locally</span>
        </motion.div>
      </div>

      {/* Writing Area */}
      <div className="flex-1 px-5 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full h-full min-h-[400px] bg-transparent text-white/90 placeholder:text-white/30 resize-none focus:outline-none"
            style={{
              lineHeight: '1.8'
            }}
          />
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 backdrop-blur-xl bg-[#071224]/80 border-t border-white/5">
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!text.trim()}
          className={`w-full py-4 rounded-[20px] transition-all duration-300 flex items-center justify-center gap-2 ${
            text.trim()
              ? 'bg-gradient-to-r from-[#8FD3FF]/80 to-[#A68BFF]/80 hover:from-[#8FD3FF] hover:to-[#A68BFF] text-white'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
          style={{
            boxShadow: text.trim() ? '0 8px 32px rgba(143, 211, 255, 0.3)' : 'none'
          }}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved
            </>
          ) : (
            'Save entry'
          )}
        </motion.button>
      </div>
    </div>
  );
}

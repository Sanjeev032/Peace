import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { MusicTrack } from './MoodBasedMusicTherapy';

interface MoodMusicCardProps {
  track: MusicTrack;
  moodColor: string;
  onSelect: () => void;
  isActive?: boolean;
}

export function MoodMusicCard({ track, moodColor, onSelect, isActive = false }: MoodMusicCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left biophilic-card p-5 group transition-all duration-300 ${
        isActive
          ? 'bg-white/60 border-[#8BA888]/40 ring-1 ring-[#8BA888]/20'
          : 'bg-white/30 border-white/60 hover:bg-white/40'
      }`}
      style={{
        boxShadow: isActive
          ? `0 12px 32px ${moodColor}20`
          : '0 4px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex items-start gap-4">
        {/* Play button */}
        <motion.div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
          style={{
            backgroundColor: `${moodColor}15`,
            border: `1.5px solid ${moodColor}`
          }}
        >
          <Play className="w-5 h-5 text-[#2D2D2D] ml-0.5" fill={isActive ? "#2D2D2D" : "none"} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-[#2D2D2D] font-serif font-semibold text-lg">{track.title}</h4>
            <span className="text-[#5C5C5C]/60 whitespace-nowrap text-xs font-bold uppercase tracking-wider">{track.duration}</span>
          </div>
          <p className="text-[#5C5C5C] text-sm mb-3 leading-relaxed opacity-80">{track.description}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: moodColor }}
            />
            <span className="text-[#5C5C5C]/70 text-xs font-bold uppercase tracking-tighter">{track.category}</span>
          </div>
        </div>
      </div>

      {/* Active pulse indicator */}
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#8BA888] rounded-full blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.button>
  );
}

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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left backdrop-blur-md border rounded-[20px] p-5 transition-all duration-300 ${
        isActive
          ? 'bg-white/20 border-white/40'
          : 'bg-white/10 border-white/20 hover:bg-white/15'
      }`}
      style={{
        boxShadow: isActive
          ? `0 8px 24px ${moodColor}40`
          : '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-start gap-4">
        {/* Play button */}
        <motion.div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `${moodColor}30`,
            border: `2px solid ${moodColor}`
          }}
          whileHover={{
            backgroundColor: `${moodColor}50`,
            boxShadow: `0 4px 16px ${moodColor}40`
          }}
        >
          <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-white/90">{track.title}</h4>
            <span className="text-white/50 whitespace-nowrap text-sm">{track.duration}</span>
          </div>
          <p className="text-white/60 text-sm mb-2 leading-relaxed">{track.description}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: moodColor }}
            />
            <span className="text-white/50 text-xs">{track.category}</span>
          </div>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mt-3 h-1 rounded-full"
          style={{ backgroundColor: moodColor }}
        />
      )}
    </motion.button>
  );
}

import { motion } from 'motion/react';
import { Music, Waves, Radio, Volume2, Wind, Sparkles } from 'lucide-react';
import { MusicCategory } from './MusicTherapy';

interface MusicCategoryCardProps {
  category: MusicCategory;
  onSelect: () => void;
  isActive?: boolean;
}

const categoryIcons = {
  classical: Music,
  ambient: Waves,
  binaural: Radio,
  '432hz': Volume2,
  nature: Wind,
  glass: Sparkles
};

export function MusicCategoryCard({ category, onSelect, isActive = false }: MusicCategoryCardProps) {
  const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || Music;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left backdrop-blur-md border rounded-[20px] p-5 transition-all duration-300 ${
        isActive
          ? 'bg-white/10 border-white/30'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
      style={{
        boxShadow: isActive
          ? `0 8px 32px ${category.color}40, inset 0 1px 1px rgba(255, 255, 255, 0.15)`
          : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <motion.div
          className="p-3 rounded-2xl backdrop-blur-sm"
          style={{
            backgroundColor: `${category.color}20`,
            border: `1px solid ${category.color}30`
          }}
          animate={{
            boxShadow: isActive
              ? [
                  `0 0 20px ${category.color}40`,
                  `0 0 30px ${category.color}60`,
                  `0 0 20px ${category.color}40`
                ]
              : `0 0 10px ${category.color}20`
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut'
          }}
        >
          <Icon className="w-6 h-6" style={{ color: category.color }} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white/90">{category.title}</h3>
            <span className="text-white/50 whitespace-nowrap text-sm">{category.duration}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{category.description}</p>

          {/* Visual indicator for wave type */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              {category.waveType === 'bars' && (
                <>
                  <div className="w-1 h-3 rounded-full" style={{ backgroundColor: `${category.color}60` }} />
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: `${category.color}80` }} />
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: category.color }} />
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: `${category.color}80` }} />
                  <div className="w-1 h-3 rounded-full" style={{ backgroundColor: `${category.color}60` }} />
                </>
              )}
              {category.waveType === 'flowing' && (
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <path
                    d="M0 8 Q10 4, 20 8 T40 8"
                    stroke={category.color}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
              )}
              {category.waveType === 'circular' && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke={category.color} strokeWidth="2" opacity="0.8" />
                  <circle cx="8" cy="8" r="3" fill={category.color} opacity="0.6" />
                </svg>
              )}
              {category.waveType === 'harmonic' && (
                <>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${category.color}40` }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${category.color}60` }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${category.color}80` }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${category.color}15, transparent 70%)`
        }}
      />
    </motion.button>
  );
}

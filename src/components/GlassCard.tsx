import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GlassCard({ children, onClick, className = '' }: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: onClick ? 1.02 : 1, y: onClick ? -2 : 0 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] hover:bg-white/10 transition-all duration-300 hover:border-white/20 ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      {children}
    </motion.div>
  );
}

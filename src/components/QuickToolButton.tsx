import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface QuickToolButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}

export function QuickToolButton({ icon, label, onClick, fullWidth = false }: QuickToolButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] p-5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 ${
        fullWidth ? 'w-full' : 'flex-1'
      }`}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-[#8FD3FF]">{icon}</div>
        <div className="text-white/90">{label}</div>
      </div>
    </motion.button>
  );
}

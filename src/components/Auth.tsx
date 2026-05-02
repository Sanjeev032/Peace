import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Mail, Lock, User, 
  ArrowRight, Loader2, AlertCircle, Sparkles,
  ChevronRight
} from 'lucide-react';
import { login, register, adminLogin } from '../services/api';
import { User as UserType } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserType) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let user;
      if (isAdminMode) {
        user = await adminLogin(password);
      } else if (isLogin) {
        user = await login({ email, password });
      } else {
        user = await register({ name, email, password });
      }

      if (user.token) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        onAuthSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsAdminMode(false);
    setError(null);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#8BA888]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#C17F5B]/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="biophilic-card p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Glass Overlay Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -mr-16 -mt-16 pointer-events-none" />
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-[#2D2D2D] rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#2D2D2D]/20"
            >
              {isAdminMode ? (
                <ShieldCheck className="w-10 h-10 text-[#8BA888]" />
              ) : (
                <Sparkles className="w-10 h-10 text-[#8BA888]" />
              )}
            </motion.div>
            
            <h1 className="text-4xl font-serif text-[#2D2D2D] mb-2 tracking-tight">
              {isAdminMode ? 'Admin Portal' : isLogin ? 'Welcome back' : 'Create sanctuary'}
            </h1>
            <p className="text-[#5C5C5C] font-medium opacity-70">
              {isAdminMode 
                ? 'Authorized access only' 
                : isLogin 
                ? 'Your mindful journey continues' 
                : 'Begin your journey to inner peace'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-[#C17F5B]/10 border border-[#C17F5B]/20 rounded-2xl flex items-center gap-3 text-[#C17F5B] text-sm font-bold overflow-hidden"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {!isAdminMode && !isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D2D2D]/40 uppercase tracking-widest px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D2D2D]/20" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sanjeev Kumar"
                    className="w-full pl-12 pr-6 py-4 bg-[#F5F2ED] border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8BA888]/30 transition-all"
                  />
                </div>
              </div>
            )}

            {!isAdminMode && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D2D2D]/40 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D2D2D]/20" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-6 py-4 bg-[#F5F2ED] border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8BA888]/30 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D2D2D]/40 uppercase tracking-widest px-1">
                {isAdminMode ? 'Security Key' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D2D2D]/20" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-12 pr-6 py-4 bg-[#F5F2ED] border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8BA888]/30 transition-all ${isAdminMode ? 'font-mono tracking-widest' : ''}`}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#2D2D2D] text-white rounded-2xl font-bold text-lg shadow-xl shadow-black/10 hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isAdminMode ? 'Access Portal' : isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-black/5 space-y-4">
            <button 
              onClick={toggleMode}
              className="w-full text-center text-sm font-medium text-[#5C5C5C] hover:text-[#2D2D2D] transition-colors"
            >
              {isLogin ? (
                <>Don't have an account? <span className="text-[#8BA888] font-bold">Sign up</span></>
              ) : (
                <>Already a member? <span className="text-[#8BA888] font-bold">Sign in</span></>
              )}
            </button>

            <button 
              onClick={toggleAdminMode}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#2D2D2D]/30 hover:text-[#8BA888] uppercase tracking-widest transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              {isAdminMode ? 'Back to User Login' : 'Admin Access'}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-[#5C5C5C]/40 text-xs font-medium uppercase tracking-[0.2em]">
          Protected by biophilic security • Peace v1.0
        </p>
      </motion.div>
    </div>
  );
};

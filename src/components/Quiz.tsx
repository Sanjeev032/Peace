import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Screen, QuizQuestion, QuizOption } from '../types';
import { fetchQuiz } from '../services/api';

interface QuizProps {
  onNavigate: (screen: Screen) => void;
  onMoodDetected: (mood: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onNavigate, onMoodDetected }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizOption>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState(0);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz();
        if (data && data.length > 0) {
          setQuestions(data);
          // Calculate max possible score
          const max = data.reduce((acc: number, q: QuizQuestion) => {
            const highestOptionScore = Math.max(...q.options.map(o => o.scoreValue));
            return acc + highestOptionScore;
          }, 0);
          setMaxPossibleScore(max);
        } else {
          setError("No quiz questions available. Please check the admin dashboard.");
        }
      } catch (err) {
        setError("Failed to load quiz. Please make sure the backend is running.");
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, []);

  const handleSelectOption = (option: QuizOption) => {
    setAnswers({
      ...answers,
      [questions[currentIndex]._id]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      setCurrentIndex(questions.length - 1);
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onNavigate('home');
    }
  };

  const calculateResult = () => {
    setIsFinishing(true);
    
    // Calculate mood scores and total wellness score
    const scores: Record<string, number> = {};
    let total = 0;
    
    Object.values(answers).forEach(answer => {
      const mood = answer.moodImpact;
      scores[mood] = (scores[mood] || 0) + answer.scoreValue;
      total += answer.scoreValue;
    });

    setTotalScore(total);

    // Find the mood with the highest score
    let moodResult = "Calm"; // Default
    let maxScore = -1;

    Object.entries(scores).forEach(([mood, score]) => {
      if (score > maxScore) {
        maxScore = score;
        moodResult = mood;
      }
    });

    setDetectedMood(moodResult);

    // Simulate analysis time
    setTimeout(() => {
      setIsFinishing(false);
      setShowResult(true);
    }, 2500);
  };

  const handleContinue = () => {
    if (detectedMood) {
      onMoodDetected(detectedMood.toLowerCase());
      onNavigate('music-therapy');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#8BA888] animate-spin mb-4" />
        <p className="text-[#4A4A4A] font-medium animate-pulse">Preparing your mindful journey...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <GlassCard className="p-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Oops!</h2>
          <p className="text-[#4A4A4A] mb-8">{error}</p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-[#8BA888] text-white rounded-full font-medium hover:bg-[#7A9777] transition-all shadow-lg shadow-[#8BA888]/20"
          >
            Back to Safety
          </button>
        </GlassCard>
      </div>
    );
  }

  if (isFinishing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 border-4 border-[#8BA888]/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-[#8BA888] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-4">Analyzing your responses...</h2>
          <p className="text-[#4A4A4A] max-w-md mx-auto">
            We're sensing your emotional patterns to curate the perfect experience for you.
          </p>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const scorePercentage = Math.round((totalScore / maxPossibleScore) * 100);
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-12">
            <div className="relative w-48 h-48 mx-auto mb-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-gray-100"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={553}
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * scorePercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-[#8BA888]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-serif text-[#1A1A1A]">{totalScore}</span>
                <span className="text-sm text-[#5C5C5C] font-medium uppercase tracking-widest mt-1">Score</span>
              </div>
            </div>

            <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">
              You're feeling <span className="text-[#8BA888] italic">{detectedMood}</span>
            </h2>
            <p className="text-[#5C5C5C] mb-12 max-w-sm mx-auto leading-relaxed">
              Based on your resonance patterns, your current vibe index is {totalScore}/{maxPossibleScore}. 
              We've prepared a special soundscape to align with this state.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContinue}
                className="px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-[#1A1A1A]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span>Enter Sanctuary</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-10 py-5 border-2 border-[#1A1A1A]/10 text-[#1A1A1A] rounded-full font-bold hover:bg-black/5 transition-all"
              >
                Retake Quiz
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-12 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-black/5 rounded-full transition-colors group"
        >
          <ChevronLeft className="w-6 h-6 text-[#4A4A4A] group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex-1 mx-8 h-2 bg-black/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8BA888] to-[#C17F5B]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
        <span className="text-sm font-medium text-[#4A4A4A]">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-light text-[#1A1A1A] mb-12 text-center">
            {currentQuestion.questionText}
          </h2>

          <div className="grid gap-4 mb-12">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion._id]?._id === option._id || answers[currentQuestion._id]?.text === option.text;
              return (
                <button
                  key={option._id || idx}
                  onClick={() => handleSelectOption(option)}
                  className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#8BA888]/10 border-[#8BA888] shadow-md shadow-[#8BA888]/10'
                      : 'bg-white/40 border-transparent hover:border-[#8BA888]/30 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg transition-colors ${
                      isSelected ? 'text-[#1A1A1A] font-medium' : 'text-[#4A4A4A]'
                    }`}>
                      {option.text}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[#8BA888]"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion._id]}
              className={`group flex items-center gap-2 px-10 py-4 rounded-full font-medium transition-all duration-300 ${
                answers[currentQuestion._id]
                  ? 'bg-[#1A1A1A] text-white shadow-xl hover:shadow-[#1A1A1A]/20 hover:scale-105 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

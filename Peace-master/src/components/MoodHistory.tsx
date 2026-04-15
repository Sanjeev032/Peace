import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Screen } from '../App';

interface MoodHistoryProps {
  onNavigate: (screen: Screen) => void;
}

const moodData = [
  { day: 'Mon', score: 7, label: '😊' },
  { day: 'Tue', score: 5, label: '😌' },
  { day: 'Wed', score: 8, label: '😊' },
  { day: 'Thu', score: 4, label: '😔' },
  { day: 'Fri', score: 6, label: '😌' },
  { day: 'Sat', score: 9, label: '😊' },
  { day: 'Sun', score: 7, label: '😌' }
];

export function MoodHistory({ onNavigate }: MoodHistoryProps) {
  const averageMood = (moodData.reduce((sum, d) => sum + d.score, 0) / moodData.length).toFixed(1);

  return (
    <div className="relative z-10 min-h-screen pb-12">
      {/* Header */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="text-white/60 hover:text-white/90 transition-colors p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white/90">Mood History</h2>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-5">
        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] p-6 mb-6"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-white/90 mb-4">This Week</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white/50 mb-1">Average Mood</p>
              <p className="text-white text-3xl">{averageMood}</p>
            </div>
            <div>
              <p className="text-white/50 mb-1">Entries</p>
              <p className="text-white text-3xl">{moodData.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] p-6 mb-6"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-white/90 mb-6">Mood Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={moodData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8FD3FF" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#A68BFF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#A68BFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis
                dataKey="day"
                stroke="rgba(255, 255, 255, 0.4)"
                tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.4)"
                tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(7, 18, 36, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
                labelStyle={{ color: 'rgba(255, 255, 255, 0.6)' }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#8FD3FF"
                strokeWidth={3}
                fill="url(#moodGradient)"
                dot={{
                  fill: '#A68BFF',
                  stroke: '#8FD3FF',
                  strokeWidth: 2,
                  r: 6
                }}
                activeDot={{
                  fill: '#8FD3FF',
                  stroke: '#fff',
                  strokeWidth: 2,
                  r: 8
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Mood Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] p-6"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <h3 className="text-white/90 mb-4">Daily Check-ins</h3>
          <div className="space-y-3">
            {moodData.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{item.label}</div>
                  <div>
                    <p className="text-white/90">{item.day}</p>
                    <p className="text-white/40">Mood score</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-white/90">{item.score}/10</div>
                  <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.score / 10) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-[#8FD3FF] to-[#A68BFF] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

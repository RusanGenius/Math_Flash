import React from 'react';
import { GameState } from '../types';
import GlassButton from '../components/GlassButton';
import { Home, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultsProps {
  gameState: GameState;
  onRestart: () => void;
  onRetryIncorrect: () => void;
  onHome: () => void;
}

const Results: React.FC<ResultsProps> = ({ gameState, onRestart, onRetryIncorrect, onHome }) => {
  const percentage = Math.round((gameState.correct.length / gameState.total) * 100);
  const hasIncorrect = gameState.incorrect.length > 0;
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto p-6 space-y-8">
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex items-center justify-center w-48 h-48"
      >
        {/* Added viewBox to ensure the circle stays perfectly centered regardless of container resizing */}
        <svg 
            className="transform -rotate-90 w-full h-full drop-shadow-2xl"
            viewBox="0 0 192 192"
        >
            <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
                fill="transparent"
            />
            <circle
                cx="96"
                cy="96"
                r={radius}
                stroke={percentage > 70 ? "#4ade80" : percentage > 40 ? "#facc15" : "#f87171"}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
            />
        </svg>
        {/* Adjusted alignment: absolute center + transform to ensure perfect centering */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-4xl font-light text-white">{percentage}%</span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Точность</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-green-400">{gameState.correct.length}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Верно</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl font-light text-red-400">{gameState.incorrect.length}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Ошибка</div>
          </div>
      </div>

      <div className="w-full space-y-3 pt-8">
        <GlassButton variant="primary" fullWidth onClick={onRestart}>
            <RefreshCw size={16} /> Заново
        </GlassButton>
        
        {hasIncorrect && (
            <GlassButton variant="danger" fullWidth onClick={onRetryIncorrect}>
                <AlertCircle size={16} /> Повторить ошибки ({gameState.incorrect.length})
            </GlassButton>
        )}

        <GlassButton variant="secondary" fullWidth onClick={onHome}>
            <Home size={16} /> На главную
        </GlassButton>
      </div>
    </div>
  );
};

export default Results;
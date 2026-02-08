import React, { useState } from 'react';
import { Formula, GameState } from '../types';
import { TOPICS } from '../constants';
import KaTeXRenderer from '../components/KaTeXRenderer';
import GlassButton from '../components/GlassButton';
import { ChevronLeft, Maximize, Minimize, X, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, animate } from 'framer-motion';

interface PracticeProps {
  gameState: GameState;
  onUpdateGame: (newState: Partial<GameState>) => void;
  onExit: () => void;
  onComplete: () => void;
}

// Internal component to isolate motion state per card.
const DraggableCard: React.FC<{
  formula: Formula;
  topicTitle: string;
  onSwipe: (correct: boolean) => void;
}> = ({ formula, topicTitle, onSwipe }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-5, 5]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const bg = useTransform(x, [-200, -50, 0, 50, 200], 
    ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0)', 'rgba(255,255,255,0.05)', 'rgba(34, 197, 94, 0)', 'rgba(34, 197, 94, 0.1)']
  );

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const velocity = info.velocity.x;
    
    // Check if threshold met or velocity is high enough for a fling
    if (info.offset.x > swipeThreshold || velocity > 500) {
      triggerSwipe(true);
    } else if (info.offset.x < -swipeThreshold || velocity < -500) {
      triggerSwipe(false);
    }
  };

  const triggerSwipe = (correct: boolean) => {
    if (!isFlipped) setIsFlipped(true);
    
    // Manually animate off-screen to simulate inertia ("whoosh" effect)
    const targetX = correct ? window.innerWidth : -window.innerWidth;
    
    animate(x, targetX, { 
      duration: 0.3, 
      ease: "easeIn",
      onComplete: () => {
          onSwipe(correct);
      }
    });
  };

  return (
    <motion.div
      style={{ x, rotate, backgroundColor: bg }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ 
        scale: 0.95, 
        opacity: 0, 
        transition: { duration: 0.2 }
      }}
      className="w-full h-full max-h-[70vh] min-h-[350px] relative cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden"
    >
      <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full h-full relative group"
      >
          {/* Card Content Container - Flexbox layout to prevent overlap and maximize space */}
          {/* Reduced padding to p-3 md:p-6 */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-3 md:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5">
              
              {/* Top Label - Topic Title with truncation */}
              <div className="text-white/30 text-[10px] md:text-xs font-mono uppercase tracking-widest pt-2 shrink-0 max-w-full truncate px-4" title={topicTitle}>
                 {topicTitle}
              </div>
              
              {/* Formula Area - Takes remaining space */}
              <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative my-1 px-1">
                 {/* Scroll container with globally hidden scrollbars via 'no-scrollbar' class */}
                 <div 
                    className="max-h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center no-scrollbar"
                 >
                    <div className="text-xl md:text-2xl font-light text-center leading-relaxed break-words w-full select-none pointer-events-none">
                        <KaTeXRenderer 
                            formula={isFlipped ? `${formula.q} ${formula.a}` : formula.q} 
                        />
                    </div>
                 </div>
              </div>
              
              {/* Bottom Hint - Reduced size/padding */}
              <div className="text-white/20 text-[10px] md:text-xs tracking-widest uppercase pointer-events-none pb-2 shrink-0">
                  {isFlipped ? 'Свайп или кнопки' : 'Нажми для проверки'}
              </div>
          </div>
      </div>
    </motion.div>
  );
};

const Practice: React.FC<PracticeProps> = ({ gameState, onUpdateGame, onExit, onComplete }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentFormula = gameState.queue[gameState.current];
  
  // Find current topic title
  const currentTopic = TOPICS.find(t => t.formulas.some(f => f.id === currentFormula.id));
  const topicTitle = currentTopic ? currentTopic.title : '';

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleNext = () => {
    if (gameState.current < gameState.queue.length - 1) {
        onUpdateGame({ current: gameState.current + 1 });
    } else {
        onComplete();
    }
  };
  
  const handlePrev = () => {
      if (gameState.current > 0) {
          onUpdateGame({ current: gameState.current - 1 });
      }
  };

  const handleSwipe = (correct: boolean) => {
    const cleanCorrect = gameState.correct.filter(id => id !== currentFormula.id);
    const cleanIncorrect = gameState.incorrect.filter(id => id !== currentFormula.id);

    const updates: Partial<GameState> = {
        correct: correct ? [...cleanCorrect, currentFormula.id] : cleanCorrect,
        incorrect: correct ? cleanIncorrect : [...cleanIncorrect, currentFormula.id]
    };

    onUpdateGame(updates);
    
    if (gameState.current < gameState.queue.length - 1) {
        onUpdateGame({ current: gameState.current + 1 });
    } else {
        onComplete();
    }
  };

  const progress = ((gameState.current) / gameState.total) * 100;

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 md:p-6 relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <GlassButton variant="ghost" onClick={onExit} className="!p-2 text-white/50 hover:text-white">
          <ChevronLeft />
        </GlassButton>
        <div className="text-center">
            <div className="text-xl font-mono tracking-wider text-white/90">
                {gameState.current + 1}<span className="text-white/30 mx-2">/</span>{gameState.total}
            </div>
        </div>
        <div className="flex gap-2">
            <GlassButton variant="ghost" onClick={toggleFullscreen} className="!p-2 text-white/50 hover:text-white">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </GlassButton>
        </div>
      </div>

      {/* Minimal Progress Line */}
      <div className="w-full bg-white/5 h-1 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className="bg-white/60 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Card Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative perspective-1000">
        <AnimatePresence mode="wait">
            <DraggableCard 
                key={currentFormula.id} 
                formula={currentFormula}
                topicTitle={topicTitle}
                onSwipe={handleSwipe} 
            />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 md:mt-10 flex justify-center items-center gap-6 md:gap-8 mb-4">
         <GlassButton 
            variant="ghost" 
            onClick={handlePrev}
            disabled={gameState.current === 0}
            className="rounded-full w-12 h-12 md:w-14 md:h-14 !p-0 border border-white/5 hover:border-white/20"
         >
             <ChevronLeft size={24} />
         </GlassButton>

         {/* Correct/Incorrect buttons */}
         <div className="flex gap-4 md:gap-6">
             <GlassButton 
                variant="danger"
                onClick={() => handleSwipe(false)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl !p-0 flex items-center justify-center border border-red-500/30 bg-red-500/5 hover:bg-red-500/20 text-red-200"
                title="Не помню"
             >
                 <X size={28} />
             </GlassButton>
             <GlassButton 
                variant="primary"
                onClick={() => handleSwipe(true)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl !p-0 flex items-center justify-center border border-green-500/30 bg-green-500/5 hover:bg-green-500/20 text-green-200 shadow-none"
                title="Помню"
             >
                 <Check size={28} />
             </GlassButton>
         </div>

         <GlassButton 
            variant="ghost" 
            onClick={handleNext}
            disabled={gameState.current === gameState.queue.length - 1}
            className="rounded-full w-12 h-12 md:w-14 md:h-14 !p-0 border border-white/5 hover:border-white/20"
         >
             <ChevronRight size={24} />
         </GlassButton>
      </div>
    </div>
  );
};

export default Practice;
import React from 'react';
import { TOPICS } from '../constants';
import { Settings } from '../types';
import GlassButton from '../components/GlassButton';
import { Play, Check, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  selectedTopics: string[];
  onToggleTopic: (id: string) => void;
  onStart: () => void;
  onOpenReference: () => void;
  settings: Settings;
  onUpdateSettings: (s: Partial<Settings>) => void;
}

const Home: React.FC<HomeProps> = ({ 
  selectedTopics, 
  onToggleTopic, 
  onStart,
  onOpenReference,
  settings, 
  onUpdateSettings 
}) => {
  const toggleAll = () => {
    if (selectedTopics.length === TOPICS.length) {
       TOPICS.forEach(t => {
         if (selectedTopics.includes(t.id)) onToggleTopic(t.id);
       });
    } else {
       TOPICS.forEach(t => {
         if (!selectedTopics.includes(t.id)) onToggleTopic(t.id);
       });
    }
  };

  const isAllSelected = selectedTopics.length === TOPICS.length;

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6"
      >
        <div className="flex-1 w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl font-light tracking-tight text-white">
            Flash<span className="font-light">Math</span>
          </h1>
          <p className="text-white/40 text-sm mt-1 font-mono">Тренажёр формул</p>
        </div>

        {/* Controls Container */}
        <div className="flex items-center gap-3">
            {/* Reference Button */}
            <button
                onClick={onOpenReference}
                className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Справочник формул"
            >
                <Book size={20} />
            </button>

            {/* Segmented Control / Glider for Settings */}
            <div className="bg-white/5 p-1 rounded-xl flex gap-1">
            <button 
                onClick={() => onUpdateSettings({ shuffle: false })}
                className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${!settings.shuffle 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/40 hover:text-white/60'}
                `}
            >
                По порядку
            </button>
            <button 
                onClick={() => onUpdateSettings({ shuffle: true })}
                className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${settings.shuffle 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-white/40 hover:text-white/60'}
                `}
            >
                Вперемешку
            </button>
            </div>
        </div>
      </motion.header>

      {/* Topics Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-2 custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white/80">Темы</h2>
          <button 
            onClick={toggleAll} 
            className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-wider"
          >
            {isAllSelected ? 'Снять всё' : 'Выбрать всё'}
          </button>
        </div>

        {/* Increased bottom padding to prevent content from being hidden behind the floating button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-40">
          {TOPICS.map((topic, idx) => {
            const isSelected = selectedTopics.includes(topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onToggleTopic(topic.id)}
                className={`
                  relative cursor-pointer group p-5 rounded-xl border transition-all duration-200
                  flex items-center justify-between gap-4
                  ${isSelected 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/5 border-transparent hover:bg-white/10'}
                `}
              >
                <div className="flex-1">
                  <h3 className={`font-medium text-base leading-snug ${isSelected ? 'text-white' : 'text-white/60'}`}>
                    {topic.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">{topic.formulas.length} шт.</p>
                </div>
                
                {/* Custom Checkbox Design: White filled circle with checkmark vs hollow circle */}
                <div className={`
                    w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200
                    ${isSelected ? 'border-white bg-white' : 'border-white/20 bg-transparent'}
                `}>
                    {isSelected && <Check size={14} className="text-neutral-900" strokeWidth={3} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Start Button with Gradient Backdrop */}
      <AnimatePresence>
        {selectedTopics.length > 0 && (
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
          >
            {/* Gradient Container - Removed backdrop-blur per request */}
            <div className="w-full bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent pt-16 pb-8 px-4 md:px-8 flex justify-center">
              <div className="w-full max-w-5xl pointer-events-auto">
                <GlassButton 
                  variant="primary" 
                  fullWidth 
                  onClick={onStart}
                  className="py-4 text-lg shadow-xl shadow-black/50"
                >
                  <Play size={18} fill="currentColor" className="mr-2" />
                  Начать ({selectedTopics.length})
                </GlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
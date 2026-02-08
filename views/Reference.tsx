import React from 'react';
import { TOPICS } from '../constants';
import KaTeXRenderer from '../components/KaTeXRenderer';
import GlassButton from '../components/GlassButton';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReferenceProps {
  onBack: () => void;
}

const Reference: React.FC<ReferenceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 md:p-8 relative">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6 shrink-0">
        <GlassButton variant="ghost" onClick={onBack} className="!p-2 text-white/60 hover:text-white">
           <ChevronLeft size={24} />
        </GlassButton>
        <div>
            <h1 className="text-2xl font-light text-white">Справочник</h1>
            <p className="text-white/40 text-xs mt-0.5 font-mono uppercase tracking-wider">Все формулы</p>
        </div>
      </div>

      {/* Content - Main scrollable area uses custom-scrollbar for consistency */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-20 space-y-8 pt-6">
        {TOPICS.map((topic, idx) => (
            <motion.div 
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
            >
                <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 pl-1">
                    {topic.title}
                </h2>
                <div className="grid grid-cols-1 gap-3">
                    {topic.formulas.map(formula => (
                        <div key={formula.id} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors overflow-hidden no-scrollbar">
                             <KaTeXRenderer formula={`${formula.q} ${formula.a}`} className="text-base md:text-lg" />
                        </div>
                    ))}
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reference;
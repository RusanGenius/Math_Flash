import React, { useState, useEffect } from 'react';
import { ViewState, Settings, GameState, Formula } from './types';
import { TOPICS } from './constants';
import Home from './views/Home';
import Practice from './views/Practice';
import Results from './views/Results';
import Reference from './views/Reference';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [settings, setSettings] = useState<Settings>({
    darkMode: true,
    shuffle: false
  });
  
  const [gameState, setGameState] = useState<GameState>({
    total: 0,
    current: 0,
    correct: [],
    incorrect: [],
    queue: []
  });

  // Handle background color changes based on theme
  useEffect(() => {
    const body = document.body;
    // Professional dark theme: Neutral gray gradients (removed slate/blue tones)
    body.className = "bg-neutral-950 text-neutral-100 antialiased overflow-hidden select-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black h-screen";
  }, [settings.darkMode]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const startGame = (customQueue?: Formula[]) => {
    let queue: Formula[] = [];

    if (customQueue) {
        queue = [...customQueue];
    } else {
        const formulas = TOPICS
            .filter(t => selectedTopics.includes(t.id))
            .flatMap(t => t.formulas);
        queue = [...formulas];
    }

    if (settings.shuffle) {
        // Simple shuffle
        queue = queue.sort(() => Math.random() - 0.5);
    } else {
        // Ensure order is preserved based on topic order in constants
        // The flatMap above already preserves order, so we just need to avoid shuffling.
        // If we are retrying specific formulas, we might want to keep them in their original relative order.
        // For now, customQueue (retry) preserves the order passed to it.
    }

    setGameState({
      total: queue.length,
      current: 0,
      correct: [],
      incorrect: [],
      queue
    });
    setView('practice');
  };

  const handleRetryIncorrect = () => {
    // We want to retry incorrect items.
    // To preserve the original order (if shuffle is off), we can filter the original queue if we stored it,
    // or just filter the current queue items that are in the incorrect list.
    
    // Current implementation of retrying from 'Results' usually passes the list of incorrect IDs.
    // Ideally, we reconstruct the queue from the incorrect IDs.
    
    // Find formulas corresponding to incorrect IDs
    // We search through all topics to find the formula objects
    const allFormulas = TOPICS.flatMap(t => t.formulas);
    const incorrectFormulas = allFormulas.filter(f => gameState.incorrect.includes(f.id));
    
    // If we want to respect the 'shuffle' setting even during retry:
    // If shuffle is on, we shuffle the incorrect ones.
    // If shuffle is off, filtering 'allFormulas' (which is ordered) naturally preserves order.
    
    startGame(incorrectFormulas);
  };

  const handleRestart = () => {
      // Restart with same settings and topics
      startGame();
  };

  return (
    <div className="h-full w-full relative">
      {/* Subtle background noise/gradient */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDI1Ii8+Cjwvc3ZnPg==')] opacity-20 pointer-events-none" />
      
      <div className="h-full w-full z-10 relative flex flex-col">
        {view === 'home' && (
            <Home 
                selectedTopics={selectedTopics}
                onToggleTopic={toggleTopic}
                onStart={() => startGame()}
                onOpenReference={() => setView('reference')}
                settings={settings}
                onUpdateSettings={(s) => setSettings(prev => ({ ...prev, ...s }))}
            />
        )}

        {view === 'reference' && (
            <Reference 
                onBack={() => setView('home')}
            />
        )}

        {view === 'practice' && (
            <Practice 
                gameState={gameState}
                onUpdateGame={(updates) => setGameState(prev => ({ ...prev, ...updates }))}
                onExit={() => setView('home')}
                onComplete={() => setView('results')}
            />
        )}

        {view === 'results' && (
            <Results 
                gameState={gameState}
                onRestart={handleRestart}
                onRetryIncorrect={handleRetryIncorrect}
                onHome={() => setView('home')}
            />
        )}
      </div>
    </div>
  );
};

export default App;
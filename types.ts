export interface Formula {
  id: string;
  q: string;
  a: string;
}

export interface Topic {
  id: string;
  title: string;
  formulas: Formula[];
}

export interface GameState {
  total: number;
  current: number;
  correct: string[]; // IDs of correct formulas
  incorrect: string[]; // IDs of incorrect formulas
  queue: Formula[]; // Shuffled queue
}

export type ViewState = 'home' | 'practice' | 'results' | 'reference';

export interface Settings {
  darkMode: boolean;
  shuffle: boolean;
}
import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 't1',
    title: 'Основные тригонометрические тождества',
    formulas: [
      { id: '1-1', q: '\\sin^2 \\alpha + \\cos^2 \\alpha', a: '= 1' },
      { id: '1-2', q: '\\tg \\alpha', a: '= \\frac{\\sin \\alpha}{\\cos \\alpha}' },
      { id: '1-3', q: '\\ctg \\alpha', a: '= \\frac{\\cos \\alpha}{\\sin \\alpha}' },
      { id: '1-4', q: '\\tg \\alpha \\cdot \\ctg \\alpha', a: '= 1' },
      { id: '1-5', q: '\\tg^2 \\alpha + 1', a: '= \\frac{1}{\\cos^2 \\alpha}' },
      { id: '1-6', q: '\\ctg^2 \\alpha + 1', a: '= \\frac{1}{\\sin^2 \\alpha}' },
    ],
  },
  {
    id: 't2',
    title: 'Чётность, нечётность',
    formulas: [
      { id: '2-1', q: '\\sin(-\\alpha)', a: '= -\\sin \\alpha' },
      { id: '2-2', q: '\\cos(-\\alpha)', a: '= \\cos \\alpha' },
      { id: '2-3', q: '\\tg(-\\alpha)', a: '= -\\tg \\alpha' },
      { id: '2-4', q: '\\ctg(-\\alpha)', a: '= -\\ctg \\alpha' },
    ],
  },
  {
    id: 't3',
    title: 'Формулы сложения и вычитания',
    formulas: [
      { id: '3-1', q: '\\sin(\\alpha + \\beta)', a: '= \\sin \\alpha \\cos \\beta + \\cos \\alpha \\sin \\beta' },
      { id: '3-2', q: '\\sin(\\alpha - \\beta)', a: '= \\sin \\alpha \\cos \\beta - \\cos \\alpha \\sin \\beta' },
      { id: '3-3', q: '\\cos(\\alpha + \\beta)', a: '= \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta' },
      { id: '3-4', q: '\\cos(\\alpha - \\beta)', a: '= \\cos \\alpha \\cos \\beta + \\sin \\alpha \\sin \\beta' },
      { id: '3-5', q: '\\tg(\\alpha + \\beta)', a: '= \\frac{\\tg \\alpha + \\tg \\beta}{1 - \\tg \\alpha \\cdot \\tg \\beta}' },
      { id: '3-6', q: '\\tg(\\alpha - \\beta)', a: '= \\frac{\\tg \\alpha - \\tg \\beta}{1 + \\tg \\alpha \\cdot \\tg \\beta}' },
      { id: '3-7', q: '\\ctg(\\alpha + \\beta)', a: '= \\frac{\\ctg \\alpha \\cdot \\ctg \\beta - 1}{\\ctg \\beta + \\ctg \\alpha}' },
      { id: '3-8', q: '\\ctg(\\alpha - \\beta)', a: '= \\frac{\\ctg \\alpha \\cdot \\ctg \\beta + 1}{\\ctg \\beta - \\ctg \\alpha}' },
    ],
  },
  {
    id: 't4',
    title: 'Формулы двойного угла',
    formulas: [
      { id: '4-1', q: '\\sin 2\\alpha', a: '= 2 \\sin \\alpha \\cos \\alpha' },
      { id: '4-2', q: '\\cos 2\\alpha \\; \\text{(осн.)}', a: '= \\cos^2 \\alpha - \\sin^2 \\alpha' },
      { id: '4-3', q: '\\cos 2\\alpha \\; \\text{(ч/з sin)}', a: '= 1 - 2\\sin^2 \\alpha' },
      { id: '4-4', q: '\\cos 2\\alpha \\; \\text{(ч/з cos)}', a: '= 2\\cos^2 \\alpha - 1' },
      { id: '4-5', q: '\\tg 2\\alpha', a: '= \\frac{2\\tg \\alpha}{1 - \\tg^2 \\alpha}' },
      { id: '4-6', q: '\\ctg 2\\alpha', a: '= \\frac{\\ctg^2 \\alpha - 1}{2\\ctg \\alpha}' },
    ],
  },
  {
    id: 't5',
    title: 'Формулы половинного аргумента',
    formulas: [
      { id: '5-1', q: '\\sin^2 \\frac{\\alpha}{2}', a: '= \\frac{1 - \\cos \\alpha}{2}' },
      { id: '5-2', q: '\\cos^2 \\frac{\\alpha}{2}', a: '= \\frac{1 + \\cos \\alpha}{2}' },
      { id: '5-3', q: '\\tg^2 \\frac{\\alpha}{2}', a: '= \\frac{1 - \\cos \\alpha}{1 + \\cos \\alpha}' },
      { id: '5-4', q: '\\ctg^2 \\frac{\\alpha}{2}', a: '= \\frac{1 + \\cos \\alpha}{1 - \\cos \\alpha}' },
      { id: '6-1', q: '\\tg \\frac{\\alpha}{2}', a: '= \\frac{\\sin \\alpha}{1 + \\cos \\alpha} = \\frac{1 - \\cos \\alpha}{\\sin \\alpha}' },
      { id: '6-2', q: '\\ctg \\frac{\\alpha}{2}', a: '= \\frac{\\sin \\alpha}{1 - \\cos \\alpha} = \\frac{1 + \\cos \\alpha}{\\sin \\alpha}' },
    ],
  },
  {
    id: 't7',
    title: 'Преобразование суммы и разности в произведение',
    formulas: [
      { id: '7-1', q: '\\sin \\alpha + \\sin \\beta', a: '= 2 \\sin \\frac{\\alpha + \\beta}{2} \\cos \\frac{\\alpha - \\beta}{2}' },
      { id: '7-2', q: '\\sin \\alpha - \\sin \\beta', a: '= 2 \\cos \\frac{\\alpha + \\beta}{2} \\sin \\frac{\\alpha - \\beta}{2}' },
      { id: '7-3', q: '\\cos \\alpha + \\cos \\beta', a: '= 2 \\cos \\frac{\\alpha + \\beta}{2} \\cos \\frac{\\alpha - \\beta}{2}' },
      { id: '7-4', q: '\\cos \\alpha - \\cos \\beta', a: '= -2 \\sin \\frac{\\alpha + \\beta}{2} \\sin \\frac{\\alpha - \\beta}{2}' },
      { id: '7-5', q: '\\tg \\alpha \\pm \\tg \\beta', a: '= \\frac{\\sin(\\alpha \\pm \\beta)}{\\cos \\alpha \\cos \\beta}' },
      { id: '7-6', q: '\\ctg \\alpha \\pm \\ctg \\beta', a: '= \\frac{\\sin(\\beta \\pm \\alpha)}{\\sin \\alpha \\sin \\beta}' },
    ],
  },
  {
    id: 't8',
    title: 'Формулы тройного угла*',
    formulas: [
      { id: '8-1', q: '\\sin 3\\alpha', a: '= 3\\sin \\alpha - 4\\sin^3 \\alpha' },
      { id: '8-2', q: '\\cos 3\\alpha', a: '= 4\\cos^3 \\alpha - 3\\cos \\alpha' },
      { id: '8-3', q: '\\tg 3\\alpha', a: '= \\frac{3\\tg \\alpha - \\tg^3 \\alpha}{1 - 3\\tg^2 \\alpha}' },
      { id: '8-4', q: '\\ctg 3\\alpha', a: '= \\frac{\\ctg^3 \\alpha - 3\\ctg \\alpha}{3\\ctg^2 \\alpha - 1}' },
    ],
  },
  {
    id: 't9',
    title: 'Универсальная подстановка через тангенс половинного аргумента*',
    formulas: [
      { id: '9-1', q: '\\sin \\alpha', a: '= \\frac{2\\tg \\frac{\\alpha}{2}}{1 + \\tg^2 \\frac{\\alpha}{2}}' },
      { id: '9-2', q: '\\cos \\alpha', a: '= \\frac{1 - \\tg^2 \\frac{\\alpha}{2}}{1 + \\tg^2 \\frac{\\alpha}{2}}' },
      { id: '9-3', q: '\\tg \\alpha', a: '= \\frac{2\\tg \\frac{\\alpha}{2}}{1 - \\tg^2 \\frac{\\alpha}{2}}' },
      { id: '9-4', q: '\\ctg \\alpha', a: '= \\frac{1 - \\tg^2 \\frac{\\alpha}{2}}{2\\tg \\frac{\\alpha}{2}}' },
    ],
  },
  {
    id: 't10',
    title: 'Преобразование произведения в сумму (разность)',
    formulas: [
      { id: '10-1', q: '\\sin \\alpha \\cdot \\sin \\beta', a: '= \\frac{\\cos(\\alpha - \\beta) - \\cos(\\alpha + \\beta)}{2}' },
      { id: '10-2', q: '\\cos \\alpha \\cdot \\cos \\beta', a: '= \\frac{\\cos(\\alpha - \\beta) + \\cos(\\alpha + \\beta)}{2}' },
      { id: '10-3', q: '\\sin \\alpha \\cdot \\cos \\beta', a: '= \\frac{\\sin(\\alpha + \\beta) + \\sin(\\alpha - \\beta)}{2}' },
      { id: '10-4', q: '\\tg \\alpha \\cdot \\tg \\beta', a: '= \\frac{\\tg \\alpha + \\tg \\beta}{\\ctg \\alpha + \\ctg \\beta}' },
      { id: '10-5', q: '\\ctg \\alpha \\cdot \\ctg \\beta', a: '= \\frac{\\ctg \\alpha + \\ctg \\beta}{\\tg \\alpha + \\tg \\beta}' },
    ],
  },
  {
    id: 't11',
    title: 'Введение вспомогательного угла',
    formulas: [
      { id: '11-1', q: '\\sin \\alpha + \\cos \\alpha', a: '= \\sqrt{2} \\sin(\\alpha + \\frac{\\pi}{4})' },
      { id: '11-2', q: '\\sin \\alpha - \\cos \\alpha', a: '= \\sqrt{2} \\sin(\\alpha - \\frac{\\pi}{4})' },
    ],
  },
  {
    id: 't12',
    title: 'Понижение степени',
    formulas: [
      { id: '12-1', q: '\\sin^2 \\alpha', a: '= \\frac{1 - \\cos 2\\alpha}{2}' },
      { id: '12-2', q: '\\cos^2 \\alpha', a: '= \\frac{1 + \\cos 2\\alpha}{2}' },
    ],
  },
];
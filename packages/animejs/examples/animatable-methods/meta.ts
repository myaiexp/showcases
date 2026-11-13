// Animatable example: getters, setters and revert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animatable getters, setters and revert',
  summary: 'A circle driven by createAnimatable(). Buttons call x(120), y(50, 500, \'out(2)\') and chained setters; a readout polls the x() and y() getters while it eases, and revert() puts the circle back. The card walks the circle through four corners with chained setters.',
  section: 'Animatable',
  tags: ['createAnimatable', 'getters', 'setters', 'revert', 'chaining'],
  docs: [
    'pages/animejs-com/documentation/animatable/animatable-methods.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/getters.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/setters.md',
    'pages/animejs-com/documentation/animatable/animatable-methods/revert.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

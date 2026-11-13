// animejs example: refresh() on function-based values
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/animation-methods/';

export default defineMeta({
  title: 'Animation refresh method with function values',
  summary:
    'Random function-based values are re-computed by refresh(), called from onLoop on every iteration and from a button that also restarts.',
  section: 'Animation',
  tags: ['animate', 'refresh', 'restart', 'onLoop', 'function based values', 'utils.random'],
  docs: [`${base}refresh.md`, `${base}restart.md`, 'pages/animejs-com/documentation/animation/animation-callbacks/onloop.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// css-doodle example: A random permutation of positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A random permutation of positions',
  summary:
    '@pd.m5x5(...) shuffles the twenty-five positions of a 5x5 sequence, so each numbered cell is placed in a different spot and every spot is used exactly once.',
  section: 'Random',
  tags: ['@pd', '@m', '@place', '@nx', '@ny'],
  docs: [
    'pages/css-doodle-com/reference/function-pd.md',
    'pages/css-doodle-com/reference/function-m.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

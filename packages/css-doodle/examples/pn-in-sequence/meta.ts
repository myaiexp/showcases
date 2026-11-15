// css-doodle example: @pn inside @m
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@pn inside @m',
  summary:
    'Inside a sequence @pn advances once per step instead of once per cell, so the four stops of the gradient each take the next color of the list.',
  section: 'Random',
  tags: ['@pn', '@m', '@n', 'linear-gradient'],
  docs: [
    'pages/css-doodle-com/reference/function-pn.md',
    'pages/css-doodle-com/reference/function-m.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

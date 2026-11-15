// css-doodle example: Smooth noise with @R
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smooth noise with @R',
  summary:
    '@R reads 2D noise at the cell position, so neighbouring cells get similar values and the grid changes smoothly, unlike @r. Mapped onto a hue, it gives soft patches of color; each seed gives a new field.',
  section: 'Random',
  tags: ['@R', '@rn', 'hsl', 'noise'],
  docs: [
    'pages/css-doodle-com/reference/function-r-upper.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

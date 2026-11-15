// css-doodle example: Noise scale and named arguments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise scale and named arguments',
  summary:
    'The fourth argument multiplies the result, bounds included, so @R(100, 200, 1, 2) lands between 200 and 400. Named arguments, from, to, frequency, scale and octave, can be given in any order.',
  section: 'Random',
  tags: ['@R', 'scale', 'from', 'to', 'content'],
  docs: [
    'pages/css-doodle-com/reference/function-r-upper.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

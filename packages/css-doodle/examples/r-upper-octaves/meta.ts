// css-doodle example: Noise octaves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noise octaves',
  summary:
    'The octave count adds layers of finer noise together, from 1 to 100. Arguments after the range can be named in any order, as in @R(0, 1, frequency=2, octave=4).',
  section: 'Random',
  tags: ['@R', 'octave', 'frequency', 'opacity'],
  docs: [
    'pages/css-doodle-com/reference/function-r-upper.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

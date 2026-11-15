// css-doodle example: Repeating gradient stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repeating gradient stops',
  summary:
    '@m3 writes a color and a position three times; @p re-picks the color on every step, and @n(*10%) moves the stop. The result is a set of random concentric stripes.',
  section: 'Sequence',
  tags: ['@m', '@n', '@p', 'repeating-radial-gradient'],
  docs: [
    'pages/css-doodle-com/reference/function-m.md',
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

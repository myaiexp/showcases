// css-doodle example: A ripple from angle and time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A ripple from angle and time',
  summary:
    '@dx and @dy place each cell around the center, so @atan2(@dy, @dx) is its angle. Adding @t(/500) to that angle and taking the sine as a scale sweeps a ripple outward.',
  section: 'Cell functions',
  tags: ['@t', '@dx', '@dy', '@atan2', 'scale', 'animation'],
  docs: [
    'pages/css-doodle-com/reference/function-t.md',
    'pages/css-doodle-com/reference/function-dx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

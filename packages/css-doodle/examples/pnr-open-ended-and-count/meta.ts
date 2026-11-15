// css-doodle example: @pnr with ... and x2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@pnr with ... and x2',
  summary:
    '@pnr(1, 2, ...) runs on to one value per cell and then walks back, so four cells read 4, 3, 2, 1. A value followed by x2 plays twice in a row: @pn(a x2, b) gives a, a, b.',
  section: 'Random',
  tags: ['@pn', '@pnr', '...', 'x<count>', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-pn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

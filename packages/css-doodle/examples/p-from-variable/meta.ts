// css-doodle example: Picking from a variable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking from a variable',
  summary:
    'A custom property holding a comma-separated list gives one candidate per item: @p(--colors) picks one color per cell, read when the doodle is generated. @shape: @p(circle, hexagon) picks a shape as well.',
  section: 'Random',
  tags: ['@p', '--variable', '@shape'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

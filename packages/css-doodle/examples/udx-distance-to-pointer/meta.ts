// css-doodle example: Distance from the pointer to each cell
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Distance from the pointer to each cell',
  summary:
    '@udx and @udy are the offset from the pointer to the center of each cell, in pixels. The custom property --d is their hypot(), the distance, and the cells nearest the pointer keep the largest scale.',
  section: 'Cell functions',
  tags: ['@udx', '@udy', '@uw', 'hypot', 'pointer'],
  docs: [
    'pages/css-doodle-com/reference/function-udx.md',
    'pages/css-doodle-com/reference/function-ux.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

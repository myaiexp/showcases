// css-doodle example: An expression as the count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An expression as the count',
  summary:
    'The count can be an expression: @M(@i, ●) repeats the dot once for the first cell, twice for the second and so on, so the grid reads as a bar chart of its own indices.',
  section: 'Sequence',
  tags: ['@m', '@M', '@i', 'count'],
  docs: [
    'pages/css-doodle-com/reference/function-m.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

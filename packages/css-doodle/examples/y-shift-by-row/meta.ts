// css-doodle example: Rows shifted by their number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows shifted by their number',
  summary:
    'Each cell is translated by @y(*5%) of its own size, so every row sits further to the right than the one above and the grid leans into a slope.',
  section: 'Cell functions',
  tags: ['@y', 'translate'],
  docs: [
    'pages/css-doodle-com/reference/function-y.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// css-doodle example: Picking by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking by index',
  summary:
    'An expression before a colon picks the value at that position, counting from 1 and wrapping. @p(x + y: ...) reads the cell names, so the pick follows the cell instead of the seed and draws a diagonal stripe pattern.',
  section: 'Random',
  tags: ['@p', 'index', ':'],
  docs: [
    'pages/css-doodle-com/reference/function-p.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

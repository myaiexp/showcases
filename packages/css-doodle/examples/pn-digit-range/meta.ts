// css-doodle example: A range with @pn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A range with @pn',
  summary:
    '@pn([1-9]) expands the bracket to the digits 1 to 9 and walks them in order, one per cell, starting over after 9.',
  section: 'Random',
  tags: ['@pn', '[range]', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-pn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

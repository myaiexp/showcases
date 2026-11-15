// css-doodle example: Depth: a chain of nested cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth: a chain of nested cells',
  summary:
    'A 1x1xN grid is a chain: each cell contains the next. Every cell here is a square inside the previous one, turned by a few degrees with @z, so the nesting shows as a spiral. @Z is the depth count and @depth is another name for @z.',
  section: 'Cell functions',
  tags: ['@z', '@Z', '@depth', 'grid'],
  docs: [
    'pages/css-doodle-com/reference/function-z.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

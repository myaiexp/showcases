// css-doodle example: Cell index with @i and @I
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cell index with @i and @I',
  summary:
    '@i is the index of each cell, counted from 1 in reading order, and @I is the number of cells. Written into @content they label every cell; @index is another name for @i and @size is the old name for @I.',
  section: 'Cell functions',
  tags: ['@i', '@I', '@index', '@size', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-i.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

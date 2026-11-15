// css-doodle example: Counting from 0 and backwards with @i
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Counting from 0 and backwards with @i',
  summary:
    'The top rows show @i(-1), the index counted from 0. The bottom rows show @I(-@i, +1), the index counted backwards from the cell count. The middle row is left alone.',
  section: 'Cell functions',
  tags: ['@i', '@I', '@cell', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-i.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// css-doodle example: A length from the index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A length from the index',
  summary:
    'Ten cells in a column each take a width of @i(*10%), so the bars grow from 10% to 100%. A unit on any value in the operation is carried to the result.',
  section: 'Cell functions',
  tags: ['@i', 'width', '@content'],
  docs: [
    'pages/css-doodle-com/reference/function-i.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

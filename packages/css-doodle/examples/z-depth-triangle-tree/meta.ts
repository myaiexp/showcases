// css-doodle example: Depth: a tree of triangles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth: a tree of triangles',
  summary:
    'A third grid number nests cells: 1x3x4 puts a 1x3 grid inside every cell, four levels deep. Each cell is a triangle half the size of its parent, and only the leaves are filled, which draws a Sierpinski triangle.',
  section: 'Cell functions',
  tags: ['@z', 'grid', 'depth', ':empty', '@pn'],
  docs: [
    'pages/css-doodle-com/reference/function-z.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

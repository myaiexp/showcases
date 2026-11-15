// css-doodle example: Depth: a branching tree with @z(n)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth: a branching tree with @z(n)',
  summary:
    'A 1x2x10 grid is a binary tree ten levels deep: each cell is a thin bar, rotated by @pn and scaled down inside its parent. The block @z(1) selects the first level and overrides it to be the upright trunk.',
  section: 'Cell functions',
  tags: ['@z', 'grid', 'depth', '@pn'],
  docs: [
    'pages/css-doodle-com/reference/function-z.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

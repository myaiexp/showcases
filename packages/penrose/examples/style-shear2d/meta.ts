// penrose example: shear2d slides points along a direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'shear2d slides points along a direction',
  summary:
    'The matrix `shear2d(u, v)` maps a point x to `x + <v, x> u`: every point moves along u by an amount set by its position along v. The tabs shear a square with u horizontal and v vertical, with the two swapped, and with both diagonal.',
  section: 'Style: Vectors & Matrices',
  tags: ['shear2d', 'matrix', 'Polygon', 'direction'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

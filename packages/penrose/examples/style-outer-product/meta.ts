// penrose example: outerProduct squashes a square onto a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'outerProduct squashes a square onto a line',
  summary:
    'The matrix `outerProduct(u, v)` has entries `u_i v_j`, so it sends every point to a multiple of u. The grey square is the input, the red sliver is its image, and the blue arrow is u: in each tab the whole square lands on the line along that arrow.',
  section: 'Style: Vectors & Matrices',
  tags: ['outerProduct', 'matrix', 'rank one', 'Polygon', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

// penrose example: inverse undoes a matrix, determinant scales area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'inverse undoes a matrix, determinant scales area',
  summary:
    'The matrix M takes the grey square to the blue shape, and `inverse(M)` applied to that shape returns the dashed red square exactly on the original. The disc beside them has the area of the dashed circle times `determinant(M)` (radius 40 times its square root), so a determinant above 1 means M enlarges area and below 1 means it shrinks it.',
  section: 'Style: Vectors & Matrices',
  tags: ['inverse', 'determinant', 'matrix', 'Polygon', 'area'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

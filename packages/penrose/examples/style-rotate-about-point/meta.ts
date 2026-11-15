// penrose example: Rotate about a chosen point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotate about a chosen point',
  summary:
    'The affine `rotate(theta, x, y)` turns around the point (x, y) instead of the origin, which a plain 2x2 matrix cannot do. A black dot marks the pivot (30, -20); the grey square is the original and the orange one is turned by 0.8, 2.0 and 3.14 radians around it.',
  section: 'Style: Vectors & Matrices',
  tags: ['rotate', 'affine', 'homogeneous', 'pivot', 'toHomogeneousList'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

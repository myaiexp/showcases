// penrose example: skew2d slants a square
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'skew2d slants a square',
  summary:
    'The matrix `skew2d(ax, ay)` slants by angles in radians: `ax` leans the top sideways, and `ay` (default 0) lifts one side. The grey square is the original; the three tabs draw `skew2d(0.5)`, `skew2d(0, 0.5)` and `skew2d(0.4, 0.3)`.',
  section: 'Style: Vectors & Matrices',
  tags: ['skew2d', 'matrix', 'Polygon', 'angle'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

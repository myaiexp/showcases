// penrose example: identity, diagonal and matrix constructors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'identity, diagonal and matrix constructors',
  summary:
    'Matrices can be built by name: `identity(2)` leaves a square alone, `diagonal((1.8, 0.5))` stretches it and the SVG-style `matrix(a, b, c, d, e, f)` packs a slant and a shift into one 3x3. The grey outline is the original in each tab.',
  section: 'Style: Vectors & Matrices',
  tags: ['identity', 'diagonal', 'matrix', 'constructors', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/vectors-matrices.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

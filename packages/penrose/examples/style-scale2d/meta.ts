// penrose example: scale2d stretches and mirrors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'scale2d stretches and mirrors',
  summary:
    'The matrix `scale2d(sx, sy)` multiplies the x and y coordinates by different factors. The grey triangle is the original; the green one is stretched by (1.6, 0.6), shrunk by (0.5, 0.5) or flipped upside down by a negative factor (1.0, -1.0).',
  section: 'Style: Vectors & Matrices',
  tags: ['scale2d', 'matrix', 'Polygon', 'mirror'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

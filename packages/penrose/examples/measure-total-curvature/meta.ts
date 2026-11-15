// penrose example: totalCurvature, signed and unsigned
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'totalCurvature, signed and unsigned',
  summary:
    '`totalCurvature(points, closed, signed)` adds up the bending along a curve. The blue bar is the signed total and the red bar the unsigned one, each 25 px per radian: a convex loop makes 2 pi either way, a wavy loop has the same signed total but a longer red bar, and a figure eight cancels to nothing signed.',
  section: 'Computation: Curve Measures',
  tags: ['totalCurvature', 'Polygon'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

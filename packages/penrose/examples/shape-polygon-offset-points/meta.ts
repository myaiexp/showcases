// penrose example: Polygon points built from unknowns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polygon points built from unknowns',
  summary:
    'A Polygon has no centre: `points` are absolute. Here each point is written as an offset from two unknowns `t.dx` and `t.dy`, so the optimizer slides the whole triangle around while a distance constraint keeps the three apart.',
  section: 'Shape: Polygon',
  tags: ['Polygon', 'points', 'unknown', 'norm'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/polygon.md',
    'repo/packages/core/src/shapes/Polygon.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

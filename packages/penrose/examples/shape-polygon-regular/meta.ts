// penrose example: Regular polygons by point list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regular polygons by point list',
  summary:
    'Each tab lists the corners of a regular polygon of radius 48 around an unknown centre. The point count is the only change; the number of sides is just how many points the list holds.',
  section: 'Shape: Polygon',
  tags: ['Polygon', 'points', 'fillColor'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/polygon.md',
    'repo/packages/core/src/shapes/Polygon.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

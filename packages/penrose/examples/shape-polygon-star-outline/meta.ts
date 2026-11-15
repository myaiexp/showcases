// penrose example: Polygon star with dashed outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polygon star with dashed outline',
  summary:
    'A ten-point star, which is concave, drawn by a `points` list with a pale fill and three outline styles: solid, `strokeStyle : "dashed"` and a `strokeDasharray` of short dots.',
  section: 'Shape: Polygon',
  tags: ['Polygon', 'points', 'strokeStyle', 'strokeDasharray'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/polygon.md', 'repo/packages/core/src/shapes/Polygon.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

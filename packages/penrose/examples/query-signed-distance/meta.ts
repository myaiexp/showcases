// penrose example: signedDistance to a circle, a rectangle and a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'signedDistance to a circle, a rectangle and a polygon',
  summary:
    '`signedDistance(shape, p)` is positive outside a shape, negative inside and zero on the outline. Each query point carries a circle whose radius is that distance without its sign, so the circle touches the shape\'s boundary; it is blue where the point is outside and red where the point is inside.',
  section: 'Computation: Geometry Queries',
  tags: ['signedDistance', 'abs', 'sign'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

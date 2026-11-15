// penrose example: shapeDistance: the gap between two shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'shapeDistance: the gap between two shapes',
  summary:
    'Three pairs of shapes sit on a row each, the right-hand member at a sampled distance. `shapeDistance` of two circles, `shapeDistanceRects` of two rectangles and `shapeDistanceRectCircle` of a rectangle and a circle give the gaps; the red bar starts on the left shape\'s edge and is that long, so it ends exactly on the right shape.',
  section: 'Computation: Geometry Queries',
  tags: ['shapeDistance', 'shapeDistanceRects', 'shapeDistanceRectCircle', 'bboxPts'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Queries.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

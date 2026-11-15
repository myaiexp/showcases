// penrose example: Path through three points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path through three points',
  summary:
    'Unlike a Bezier curve, `interpolateQuadraticFromPoints("open", p0, p1, p2)` passes exactly through `p1`. The middle dot is free to move within a band, and the curve follows it between two fixed end points.',
  section: 'Shape: Path',
  tags: ['Path', 'interpolateQuadraticFromPoints', 'd', 'Circle'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/path.md',
    'repo/packages/core/src/shapes/Path.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

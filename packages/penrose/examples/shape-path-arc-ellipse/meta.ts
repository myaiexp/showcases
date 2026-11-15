// penrose example: Path arc on an ellipse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path arc on an ellipse',
  summary:
    'The `radius` of an `arc` is `(rx, ry)`, the radii of the ellipse the arc runs along, and `rotation` turns that ellipse by degrees. The tabs keep the same two points and change only the ellipse: round, wide, and wide but rotated 40 degrees.',
  section: 'Shape: Path',
  tags: ['Path', 'arc', 'rotation', 'radius'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/path.md', 'repo/packages/core/src/shapes/Path.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

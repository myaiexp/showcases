// fabric example: Transformations: transformPoint maps object points to the canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: transformPoint maps object points to the canvas',
  summary:
    "util.transformPoint(point, matrix) applies a matrix to a point. A grid of points in the rectangle's own plane goes through calcTransformMatrix() and lands on the rotated, skewed rectangle on the canvas.",
  section: 'Transformations',
  tags: ['transformPoint','calcTransformMatrix','Point','viewportTransform','after:render'],
  docs: ['repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/docs/Understanding FabricJS/transformations.md', 'repo/src/content/docs/api/namespaces/util/functions/transformPoint.md', 'repo/src/content/docs/api/classes/Point.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

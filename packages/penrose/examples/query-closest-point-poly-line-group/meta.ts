// penrose example: closestPoint on a polygon, a polyline and a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'closestPoint on a polygon, a polyline and a group',
  summary:
    '`closestPoint` also takes a polygon, a polyline and a `Group`. For the group, the nearest point is the best over all its members: the query point on the right lands on whichever of the circle or the rectangle is closer.',
  section: 'Computation: Geometry Queries',
  tags: ['closestPoint', 'Polygon', 'Polyline', 'Group'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

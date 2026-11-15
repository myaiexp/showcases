// penrose example: closestPoint, rayIntersect and signedDistanceGroup on a Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'closestPoint, rayIntersect and signedDistanceGroup on a Group',
  summary:
    'A `Group` of a circle, a rectangle and a triangle answers queries as one shape. The blue dot is `closestPoint` to a sampled point, the red dot is the first `rayIntersect` of a sampled ray with any member, and the dashed circle around the point has the radius `signedDistanceGroup` gives for the whole group (it takes the member list, not the group).',
  section: 'Computation: Geometry Queries',
  tags: ['closestPoint', 'rayIntersect', 'signedDistanceGroup', 'Group'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

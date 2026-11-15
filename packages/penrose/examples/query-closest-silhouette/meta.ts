// penrose example: closestSilhouettePoint: the tangent point seen from a viewpoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'closestSilhouettePoint: the tangent point seen from a viewpoint',
  summary:
    'From each grey viewpoint the "silhouette" of a shape is the outline that separates its lit side from its hidden side. `closestSilhouettePoint` finds the nearest such point, where a line of sight from the viewpoint just grazes the shape, and `closestSilhouetteDistance` is how far it is, drawn as the dashed circle.',
  section: 'Computation: Geometry Queries',
  tags: ['closestSilhouettePoint', 'closestSilhouetteDistance'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});

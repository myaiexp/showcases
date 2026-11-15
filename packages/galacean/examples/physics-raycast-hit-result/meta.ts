// galacean example: Raycast: everything in a HitResult
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: everything in a HitResult",
  summary:
    "A downward ray slides over a sphere, a box, a capsule and a slope. The panel prints every HitResult field, the shape's class among them, and an arrow draws the surface normal at the hit point.",
  section: "Physics",
  tags: ['HitResult.entity', 'HitResult.distance', 'HitResult.point', 'HitResult.normal', 'HitResult.shape'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

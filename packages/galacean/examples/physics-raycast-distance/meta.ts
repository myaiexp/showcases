// galacean example: Raycast: distance limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raycast: distance limit",
  summary:
    "A ray turns round the middle of a ring of pillars. raycast(ray, distance, hitResult) only counts hits closer than the limit: inside it the ray stops at the pillar with a red dot, outside it runs out to its full length and finds nothing.",
  section: "Physics",
  tags: ['PhysicsScene.raycast', 'Ray', 'HitResult', 'HitResult.distance'],
  docs: [
    'repo/docs/en/physics/query/raycast.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

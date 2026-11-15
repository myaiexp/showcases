// galacean example: Shape cast: boxCast
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape cast: boxCast",
  summary:
    "A turning box is cast to the right through a field of crates with the full boxCast(center, halfExtents, direction, orientation, distance, layerMask, hit). The cyan wire is where it starts, the amber one where it would stop, with a dot and the surface normal at the hit.",
  section: "Physics",
  tags: ['PhysicsScene.boxCast', 'HitResult', 'Quaternion'],
  docs: [
    'repo/docs/en/physics/query/sweep.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

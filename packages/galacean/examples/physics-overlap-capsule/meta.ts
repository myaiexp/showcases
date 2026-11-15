// galacean example: Overlap: overlapCapsuleAll
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overlap: overlapCapsuleAll",
  summary:
    "A capsule lying on its side, turning as it moves, is tested with overlapCapsuleAll(center, radius, height, orientation, layerMask, shapes); the crates it overlaps light up.",
  section: "Physics",
  tags: ['PhysicsScene.overlapCapsuleAll', 'Quaternion', 'ColliderShape'],
  docs: [
    'repo/docs/en/physics/query/overlap.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// galacean example: Dynamic collider: move() on kinematic platforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: move() on kinematic platforms",
  summary:
    "Two kinematic platforms driven each frame with move(): the left one rises and falls like an elevator, the right one is moved with a position and a rotation and rocks. Crates riding them are carried by the physics, not by parenting.",
  section: "Physics",
  tags: ['DynamicCollider.move', 'DynamicCollider.isKinematic', 'Quaternion'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

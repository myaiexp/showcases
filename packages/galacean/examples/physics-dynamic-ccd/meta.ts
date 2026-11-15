// galacean example: Dynamic collider: collisionDetectionMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: collisionDetectionMode",
  summary:
    "A small fast ball is fired at a paper-thin wall in four lanes, one per CollisionDetectionMode. The panel says per lane whether the ball stopped at the wall or went through it, so the modes can be compared directly.",
  section: "Physics",
  tags: ['DynamicCollider.collisionDetectionMode', 'CollisionDetectionMode'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

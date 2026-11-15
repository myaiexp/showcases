// galacean example: Dynamic collider: isKinematic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: isKinematic",
  summary:
    "A crate that flips isKinematic every 3 seconds while balls are fired at it. As a kinematic body it is a fixed wall that ignores them; as a normal body the same hits push it across the floor.",
  section: "Physics",
  tags: ['DynamicCollider.isKinematic', 'DynamicCollider.move'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

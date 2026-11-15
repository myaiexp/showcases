// galacean example: Dynamic collider: linearDamping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: linearDamping",
  summary:
    "Four balls in free space are launched at the same speed with linearDamping 0, 0.3, 0.8 and 2: the higher the damping, the sooner they slow down and the shorter the trip.",
  section: "Physics",
  tags: ['DynamicCollider.linearDamping', 'DynamicCollider.useGravity', 'linearVelocity'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

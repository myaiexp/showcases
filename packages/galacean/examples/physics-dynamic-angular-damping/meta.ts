// galacean example: Dynamic collider: angularDamping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: angularDamping",
  summary:
    "Four bars float and are set spinning at 720 degrees per second with angularDamping 0.05 (the default), 0.5, 1.5 and 4. The more damping, the faster the spin dies away.",
  section: "Physics",
  tags: ['DynamicCollider.angularDamping', 'DynamicCollider.angularVelocity'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

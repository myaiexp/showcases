// galacean example: Dynamic collider: inertiaTensor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: inertiaTensor",
  summary:
    "The same torque is applied every physics step to three floating bars whose manual inertia tensors are 1, 5 and 25. The larger the tensor, the more slowly the bar spins up.",
  section: "Physics",
  tags: ['DynamicCollider.inertiaTensor', 'DynamicCollider.automaticInertiaTensor', 'DynamicCollider.applyTorque'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

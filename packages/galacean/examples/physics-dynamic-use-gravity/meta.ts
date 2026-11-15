// galacean example: Dynamic collider: useGravity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: useGravity",
  summary:
    "Two identical balls are launched with the same velocity inside a glass box: one with useGravity true arcs down and settles, the other with useGravity false flies straight and ricochets for ever.",
  section: "Physics",
  tags: ['DynamicCollider.useGravity', 'linearVelocity', 'PhysicsMaterial.bounciness'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

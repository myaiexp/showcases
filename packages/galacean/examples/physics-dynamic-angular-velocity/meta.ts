// galacean example: Dynamic collider: angularVelocity and its limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dynamic collider: angularVelocity and its limit",
  summary:
    "Three bars float without gravity and are all told to spin at 2000 degrees per second, but their maxAngularVelocity is 5000, 1000 and 300: the engine clamps the real spin to the limit.",
  section: "Physics",
  tags: ['DynamicCollider.angularVelocity', 'DynamicCollider.maxAngularVelocity', 'DynamicCollider.angularDamping'],
  docs: [
    'repo/docs/en/physics/collider/dynamicCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

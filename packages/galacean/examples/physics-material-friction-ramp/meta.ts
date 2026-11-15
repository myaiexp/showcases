// galacean example: Material: friction on a ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Material: friction on a ramp",
  summary:
    "Four identical crates start on four lanes of one 30-degree ramp. The lanes are shapes of one StaticCollider with friction 0.1, 0.3, 0.5 and 0.7: the first three slide and the last one grips.",
  section: "Physics",
  tags: ['PhysicsMaterial.staticFriction', 'PhysicsMaterial.dynamicFriction', 'StaticCollider'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

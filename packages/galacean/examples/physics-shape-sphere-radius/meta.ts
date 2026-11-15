// galacean example: Sphere shape: radius and a slot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sphere shape: radius and a slot",
  summary:
    "Balls of growing radius fall onto a 1.2-wide slot in a platform. SphereColliderShape.radius decides which ones squeeze through and which stay on top. Choose the radius yourself in the full view.",
  section: "Physics",
  tags: ['SphereColliderShape.radius', 'StaticCollider', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

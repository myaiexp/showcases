// galacean example: Plane shape: an infinite slope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Plane shape: an infinite slope",
  summary:
    "A PlaneColliderShape with its rotation set to 12 degrees is an endless tilted ground: balls roll down it for ever. The square outline only marks where the plane passes through the origin.",
  section: "Physics",
  tags: ['PlaneColliderShape', 'ColliderShape.rotation'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

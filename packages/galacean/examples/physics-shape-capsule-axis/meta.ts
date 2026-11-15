// galacean example: Capsule shape: radius, height, upAxis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Capsule shape: radius, height, upAxis",
  summary:
    "Three capsules with the same radius and height but upAxis Y, X and Z are dropped: the Y one stands up and topples, the others lie down and roll. The outlines show each shape's axis.",
  section: "Physics",
  tags: ['CapsuleColliderShape', 'upAxis', 'ColliderShapeUpAxis'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

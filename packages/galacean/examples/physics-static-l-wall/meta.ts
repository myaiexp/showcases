// galacean example: Static collider: an L-shaped wall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Static collider: an L-shaped wall",
  summary:
    "A wall made of two box shapes in one StaticCollider, as in the docs' composite example: balls are thrown at the corner and bounce along the two arms.",
  section: "Physics",
  tags: ['StaticCollider', 'BoxColliderShape', 'Collider.addShape'],
  docs: [
    'repo/docs/en/physics/collider/staticCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

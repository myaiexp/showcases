// galacean example: The three collider types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The three collider types",
  summary:
    "Side by side: a StaticCollider platform that never moves, DynamicCollider crates that fall onto it and tumble, and a CharacterController capsule that walks back and forth under script control, blocked by the platform. Each is a different component added with addComponent.",
  section: "Physics",
  tags: ['StaticCollider', 'DynamicCollider', 'CharacterController', 'Entity.addComponent'],
  docs: [
    'repo/docs/en/physics/collider/overview.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// galacean example: Box shape: size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box shape: size",
  summary:
    "A cube whose BoxColliderShape size is changed while its mesh stays 1 x 1 x 1: the cyan outline is the real collision box, so balls bounce off air and the cube rides up and down on it.",
  section: "Physics",
  tags: ['BoxColliderShape.size', 'DynamicCollider', 'ColliderShape'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

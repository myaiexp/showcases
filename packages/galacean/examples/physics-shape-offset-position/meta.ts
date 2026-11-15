// galacean example: Shape position offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape position offset",
  summary:
    "A cube is dropped four times with its BoxColliderShape offset from the entity: up, down and sideways. The mesh follows the entity, the cyan outline is the shape, so the cube floats, sinks or tips over.",
  section: "Physics",
  tags: ['ColliderShape.position', 'BoxColliderShape', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// galacean example: Shape rotation: a seesaw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape rotation: a seesaw",
  summary:
    "The entity of this static platform never turns; only its BoxColliderShape.rotation does. Balls roll to and fro on the tilting outline while the grey mesh stays flat.",
  section: "Physics",
  tags: ['ColliderShape.rotation', 'StaticCollider', 'BoxColliderShape'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

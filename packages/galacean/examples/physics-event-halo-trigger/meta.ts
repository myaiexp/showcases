// galacean example: Collision events: solid shape plus trigger halo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collision events: solid shape plus trigger halo",
  summary:
    "One DynamicCollider holds a solid ball shape and a larger trigger shape. As it rolls past posts the halo raises onTriggerEnter and lights them yellow before any contact, and the solid shape raises onCollisionEnter when it finally touches.",
  section: "Physics",
  tags: ['ColliderShape.isTrigger', 'onTriggerEnter', 'onCollisionEnter', 'Collider.addShape'],
  docs: [
    'repo/docs/en/physics/collider/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

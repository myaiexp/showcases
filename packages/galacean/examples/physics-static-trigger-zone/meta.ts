// galacean example: Static trigger zone with a script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Static trigger zone with a script",
  summary:
    "A static box with isTrigger = true is a zone: a script on it logs onTriggerEnter, counts onTriggerStay frames and logs onTriggerExit as a ball bounces through, and the zone glows while it is occupied.",
  section: "Physics",
  tags: ['ColliderShape.isTrigger', 'onTriggerEnter', 'onTriggerStay', 'onTriggerExit', 'StaticCollider'],
  docs: [
    'repo/docs/en/physics/collider/staticCollider.mdx',
    'repo/docs/en/physics/collider/event.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

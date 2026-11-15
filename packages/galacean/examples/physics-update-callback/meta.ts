// galacean example: onPhysicsUpdate versus onUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "onPhysicsUpdate versus onUpdate",
  summary:
    "Two balls are held at a rising and falling height by the same spring-and-damper force. The left one applies it in onPhysicsUpdate, once per physics step; the right one in onUpdate, once per frame. A script counts both callbacks.",
  section: "Physics",
  tags: ['onPhysicsUpdate', 'DynamicCollider.applyForce', 'onUpdate'],
  docs: [
    'repo/docs/en/physics/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

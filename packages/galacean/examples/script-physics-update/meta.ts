// galacean example: Script: onPhysicsUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onPhysicsUpdate",
  summary:
    "onPhysicsUpdate runs at the physics engine's fixed rate, which can be several times in one render frame or none. Two counters compare it with onUpdate while boxes fall onto a floor.",
  section: "Script",
  tags: ['Script', 'onPhysicsUpdate', 'onUpdate', 'DynamicCollider', 'StaticCollider'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

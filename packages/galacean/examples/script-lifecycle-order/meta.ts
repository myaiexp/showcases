// galacean example: Script: lifecycle hooks in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: lifecycle hooks in order",
  summary:
    "A script component logging each hook as it runs: onAwake, onEnable, onStart, onUpdate and onLateUpdate, then onDisable when enabled is switched off, onEnable again, and finally onDisable and onDestroy when the entity is destroyed.",
  section: "Script",
  tags: ['Script', 'onAwake', 'onEnable', 'onStart', 'onUpdate', 'onLateUpdate', 'onDisable', 'onDestroy'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

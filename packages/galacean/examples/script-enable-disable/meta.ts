// galacean example: Script: onEnable and onDisable triggers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onEnable and onDisable triggers",
  summary:
    "Three ways to fire onDisable and onEnable: the script's enabled flag, the entity's isActive, and an ancestor's isActive. The log names the trigger each time.",
  section: "Script",
  tags: ['Script', 'onEnable', 'onDisable', 'enabled', 'isActive', 'isActiveInHierarchy'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

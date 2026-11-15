// galacean example: Script: onAwake waits for an active entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onAwake waits for an active entity",
  summary:
    "A script on an inactive entity gets no onAwake or onEnable until the entity becomes active; the log shows when each fires after isActive is switched on.",
  section: "Script",
  tags: ['Script', 'onAwake', 'onEnable', 'isActive', 'isActiveInHierarchy'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

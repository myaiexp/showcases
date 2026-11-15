// galacean example: Script: onUpdate and deltaTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onUpdate and deltaTime",
  summary:
    "A cube turned a fixed step per frame next to one turned by deltaTime. The frame rate halves every few seconds (vSyncCount 2): the per-frame cube slows down, the deltaTime one does not.",
  section: "Script",
  tags: ['Script', 'onUpdate', 'deltaTime', 'vSyncCount'],
  docs: [
    'repo/docs/en/script/class.mdx',
    'repo/docs/en/core/time.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

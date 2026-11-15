// galacean example: Script: onStart runs before every onUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onStart runs before every onUpdate",
  summary:
    "The engine runs all pending onStart calls in bulk before the frame's onUpdate calls, so a script can read another script's initialised values. The log shows the order of the first frame.",
  section: "Script",
  tags: ['Script', 'onStart', 'onUpdate', 'getComponent'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

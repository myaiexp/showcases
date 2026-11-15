// galacean example: Script: destroy and onDestroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: destroy and onDestroy",
  summary:
    "Destroying an entity or a single component calls onDestroy; the component is recycled at the end of the frame. The log shows the callback and the destroyed flags right after the call and a frame later.",
  section: "Script",
  tags: ['Script', 'onDestroy', 'destroy', 'Entity', 'Component'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

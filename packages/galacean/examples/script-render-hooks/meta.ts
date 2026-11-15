// galacean example: Script: onBeginRender and onEndRender
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onBeginRender and onEndRender",
  summary:
    "Two cameras each carry a script with onBeginRender and onEndRender, which run only on camera entities, once per camera per frame, around that camera's draw. The log shows both in order.",
  section: "Script",
  tags: ['Script', 'onBeginRender', 'onEndRender', 'Camera'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// Tippy.js example: a tip that picks whichever side has the most room
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Side with the most room',
  summary:
    'A sticky note wanders around a board with a label attached. Rather than a fixed side, the label goes wherever there is most space, so it never gets pushed off the edge. In the full view you can drag the note yourself.',
  section: 'Props: position',
  tags: ['placement: auto', 'sticky', 'plugins', 'showOnCreate', 'trigger: manual'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

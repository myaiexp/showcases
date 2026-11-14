// Tippy.js example: a note popover that refuses to close over unsaved text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Don't lose what you typed",
  summary:
    'A quick-note popover that will not close while the note holds unsaved text. Clicking away only makes it shake and show a reminder; Save lets it close. The hide hook can say no.',
  section: 'Props: lifecycle hooks',
  tags: ['onHide', 'return false', 'interactive', 'trigger: click'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/html-content.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

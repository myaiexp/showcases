// Tippy.js example: a tooltip that follows the cursor only until it opens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip where you entered',
  summary:
    'A video progress bar with chapters. Rest the cursor on the bar and a tip names the chapter, opening right where the cursor was and then staying put while the cursor moves on.',
  section: 'Props: position',
  tags: ['followCursor: initial', 'delay', 'plugins', 'getReferenceClientRect'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/plugins.mdx',
    'repo/website/src/pages/index.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// Tippy.js example: a profile card on a username, reachable with the mouse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Profile card on hover',
  summary:
    'Hover a name in a comment thread and a small profile card appears with a working Follow button. Because it is interactive the pointer can travel into it. The last name has an ordinary tip, which disappears the moment you leave the name.',
  section: 'Props: behaviour',
  tags: ['interactive', 'delay', 'content: Element', 'show()', 'hide()'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/index.mdx',
    'repo/website/src/pages/v6/html-content.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

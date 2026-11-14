// Tippy.js example: tooltips that flip and slide to stay on screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltips & smart placement',
  summary:
    'Nine buttons sit at the corners and edges of a box, and every tooltip prefers the top. Near the top edge there is no room, so the tip flips below; near a side it slides along to stay inside. Turn either behaviour off to see the tip get cut off.',
  section: 'Overview',
  tags: ['placement', 'popperOptions', 'flip', 'preventOverflow', 'setProps'],
  docs: [
    'repo/website/src/pages/index.mdx',
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/methods.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

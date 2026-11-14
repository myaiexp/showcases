// Tippy.js example: tips that follow, or ignore, settings written in the HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ignoring the markup\'s settings',
  summary:
    'The same three buttons carry their own tip settings in the HTML. The top row reads them, so each tip says something different and sits on its own side. The bottom row is told to ignore them, so every tip comes from the one JavaScript call.',
  section: 'Props: behaviour',
  tags: ['ignoreAttributes', 'data-tippy-*', 'content', 'placement'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/customization.mdx',
    'repo/website/src/pages/v6/constructor.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

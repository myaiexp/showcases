// Tippy.js example: tooltips on the lines of an SVG transit map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltips on lines in a drawing',
  summary:
    'Tips work on drawn shapes too, not just buttons. On this transit map each coloured line has a tip with its name, and the tip opens right where you touched the line instead of at the middle of it.',
  section: 'Overview',
  tags: ['followCursor: initial', 'plugins', 'delay', 'SVG', 'getReferenceClientRect'],
  docs: ['repo/website/src/pages/index.mdx', 'repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

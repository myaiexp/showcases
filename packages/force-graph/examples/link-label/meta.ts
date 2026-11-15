// force-graph example: Link styling: linkLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkLabel',
  summary:
    'linkLabel works like nodeLabel for links: it sets the tooltip shown over a link, here an HTML string with the link\'s name, its two ends and a capacity value. onLinkHover lets the hovered link thicken and turn red.',
  section: 'Link styling',
  tags: ['linkLabel', 'onLinkHover', 'linkColor', 'linkWidth', 'autoPauseRedraw'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

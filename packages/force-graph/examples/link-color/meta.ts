// force-graph example: Link styling: linkColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkColor',
  summary:
    'linkColor takes an attribute name or a function. The attribute here holds one colour per kind of link (road, rail, ferry); the function ignores it and colours by the link\'s value from a pale-to-orange ramp.',
  section: 'Link styling',
  tags: ['linkColor', 'linkWidth', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

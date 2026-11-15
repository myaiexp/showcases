// force-graph example: Link styling: linkLineDash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkLineDash',
  summary:
    'linkLineDash returns a dash pattern, an array of dash and gap lengths as in canvas setLineDash, for each link; a null or empty array draws it solid. By default roads are solid, rails dashed and ferries dotted.',
  section: 'Link styling',
  tags: ['linkLineDash', 'linkAutoColorBy', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

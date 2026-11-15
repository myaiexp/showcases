// force-graph example: Link styling: linkWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkWidth',
  summary:
    'linkWidth is read per link, here from the link\'s value (1 to 5). Link widths are constant in screen pixels at every zoom level, while node circles scale with the zoom, as the README notes.',
  section: 'Link styling',
  tags: ['linkWidth', 'zoom', 'nodeRelSize', 'nodeAutoColorBy'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

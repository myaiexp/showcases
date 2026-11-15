// 3d-force-graph example: Link styling: linkResolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkResolution',
  summary:
    'linkResolution is the number of radial segments of each link cylinder; it only matters for links with a positive width. The default is 6, so a fat link up close is a hexagonal prism; fewer segments make it a triangular bar, more make it round.',
  section: 'Link styling',
  tags: ['linkResolution', 'linkWidth'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

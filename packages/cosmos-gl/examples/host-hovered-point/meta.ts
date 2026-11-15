// cosmos-gl example: Host-picked hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Host-picked hover',
  summary:
    'When the page finds a point or link by its own picking, setHostHoveredPoint(index) and setHostHoveredLink(index) light it the way cosmos.gl lights a pointer hover: the ring, or the wider hovered link. Here the picking is a list beside the graph, and no pointer ever touches the canvas.',
  section: 'Headless & shared device',
  tags: ['setHostHoveredPoint', 'setHostHoveredLink', 'hoveredPointRingColor', 'hoveredLinkColor', 'hoveredLinkWidthIncrease'],
  docs: [
    'repo/history/2026/2026-10-07-host-picking.md',
    'repo/docs/host-embedding/README.md',
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

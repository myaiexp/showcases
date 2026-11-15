// cosmos-gl example: Fit view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit view',
  summary:
    'fitView(duration, padding) moves and zooms the view so that every point is visible, animated over duration milliseconds and leaving padding as a fraction of the view around the edge.',
  section: 'View & zoom',
  tags: ['fitView', 'zoomToPointByIndex', 'fitViewOnInit'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

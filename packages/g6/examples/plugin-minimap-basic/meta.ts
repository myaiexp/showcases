// g6 example: Minimap: thumbnail navigation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimap: thumbnail navigation',
  summary: 'The minimap plugin shows the whole graph as a thumbnail with a mask over the visible part. In the full view, dragging the mask pans the canvas; the card pans the graph on a timer.',
  section: 'Plugin',
  tags: ['minimap', 'size', 'position', 'drag-canvas'],
  docs: ['repo/packages/site/docs/manual/plugin/Minimap.en.md', 'repo/packages/site/common/api/plugins/minimap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

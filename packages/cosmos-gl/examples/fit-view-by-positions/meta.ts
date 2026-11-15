// cosmos-gl example: Fit view to positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit view to positions',
  summary:
    'fitViewByPointPositions(positions, duration, padding) frames the area spanned by coordinates you give it, a flat [x, y, ...] array, so the target does not have to be a point. Here two corners define a box and the points inside it are highlighted.',
  section: 'View & zoom',
  tags: ['fitViewByPointPositions', 'highlightedPointIndices', 'enableSimulation', 'rescalePositions'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

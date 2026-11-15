// cosmos-gl example: Fit view to points by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit view to points by index',
  summary:
    'fitViewByPointIndices(indices, duration, padding) frames just the listed points, however far apart they are. Here the framed points are also highlighted so the target is easy to see.',
  section: 'View & zoom',
  tags: ['fitViewByPointIndices', 'highlightedPointIndices', 'fitView'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

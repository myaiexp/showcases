// cosmos-gl example: Initial zoom level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initial zoom level',
  summary:
    'initialZoomLevel is the zoom the graph opens at, applied once when it is created and used here instead of fitViewOnInit. Changing it later does nothing, so each choice builds the graph again.',
  section: 'View & zoom',
  tags: ['initialZoomLevel', 'fitViewOnInit'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

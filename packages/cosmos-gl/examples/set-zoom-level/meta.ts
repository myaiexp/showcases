// cosmos-gl example: Set zoom level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Set zoom level',
  summary:
    'setZoomLevel(value, duration) zooms to a level, with zoom() as a shorter name for the same call, and getZoomLevel() reads the current level. Duration 0, the default, jumps there at once.',
  section: 'View & zoom',
  tags: ['setZoomLevel', 'zoom', 'getZoomLevel', 'fitViewOnInit'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

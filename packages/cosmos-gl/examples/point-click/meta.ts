// cosmos-gl example: Point and background clicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point and background clicks',
  summary:
    'onPointClick fires with the point index and its position when a point is clicked; onBackgroundClick fires when empty space is clicked. The log shows each call, and the clicked point gets a focus ring.',
  section: 'Event callbacks',
  tags: ['onPointClick', 'onBackgroundClick', 'focusedPointIndex'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

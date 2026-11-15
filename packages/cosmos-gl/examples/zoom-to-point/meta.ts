// cosmos-gl example: Zoom to a point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom to a point',
  summary:
    'zoomToPointByIndex(index, duration, scale, canZoomOut) centres the view on a point and zooms to the given scale over the given time. With canZoomOut set to false, a view already zoomed in further than the scale stays where it is.',
  section: 'View & zoom',
  tags: ['zoomToPointByIndex', 'focusedPointIndex', 'fitView'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

// cosmos-gl example: Scale points on zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scale points on zoom',
  summary:
    'By default points keep their size in pixels while you zoom, so they look smaller relative to the graph. With scalePointsOnZoom they grow and shrink with the zoom like the layout does.',
  section: 'Point styling',
  tags: ['scalePointsOnZoom', 'setZoomLevel', 'getZoomLevel'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

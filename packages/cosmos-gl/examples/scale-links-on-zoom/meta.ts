// cosmos-gl example: Scale links on zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scale links on zoom',
  summary:
    'By default links keep their width in pixels while you zoom. With scaleLinksOnZoom they thicken as you zoom in and thin out as you zoom out, and dash patterns are measured in graph space so they stay locked to the link.',
  section: 'Link styling',
  tags: ['scaleLinksOnZoom', 'linkDefaultStyle', 'setZoomLevel'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

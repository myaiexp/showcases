// cosmos-gl example: Zoom events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom events',
  summary:
    'onZoomStart, onZoom and onZoomEnd fire while the view zooms or pans, with the d3 zoom event and a flag saying whether the user or a call such as zoom() or fitView() caused it. The log shows the zoom factor and offset.',
  section: 'Event callbacks',
  tags: ['onZoomStart', 'onZoom', 'onZoomEnd', 'zoom', 'zoomToPointByIndex', 'fitView'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

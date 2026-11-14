// deck-gl example: ZoomWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ZoomWidget',
  summary:
    'The ZoomWidget adds zoom in and zoom out buttons to the map. Its onZoom callback reports the view, the direction and the new zoom level.',
  section: 'Widgets',
  tags: ['ZoomWidget', 'onZoom', 'placement', 'stylesheet.css'],
  docs: [
    'repo/docs/api-reference/widgets/zoom-widget.md',
    'repo/docs/api-reference/widgets/overview.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

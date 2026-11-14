// deck-gl example: Widgets per view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widgets in several views',
  summary:
    'With two MapViews, a widget given a viewId sits in that view and controls only it: a zoom widget per half and a compass on the tilted right half. A fullscreen widget without viewId stays in the shared root.',
  section: 'Widgets',
  tags: ['viewId', 'placement', 'MapView', 'ZoomWidget', 'CompassWidget', 'FullscreenWidget'],
  docs: [
    'repo/docs/api-reference/widgets/overview.md',
    'repo/docs/api-reference/core/widget.md',
    'repo/docs/api-reference/widgets/zoom-widget.md',
    'repo/docs/api-reference/widgets/compass-widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

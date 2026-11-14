// deck-gl example: Widget placement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widget placement',
  summary:
    'placement puts a widget in one of the four corners of its view. A horizontal ZoomWidget is moved between corners with setProps while a compass, a scale bar and a screenshot button stay where they are.',
  section: 'Widgets',
  tags: ['placement', 'setProps', 'ZoomWidget', 'CompassWidget', 'ScaleWidget', 'ScreenshotWidget'],
  docs: [
    'repo/docs/api-reference/core/widget.md',
    'repo/docs/api-reference/widgets/overview.md',
    'repo/docs/api-reference/widgets/zoom-widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

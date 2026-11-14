// deck-gl example: ScreenshotWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ScreenshotWidget',
  summary:
    'A camera button that captures the canvas. By default it downloads a file; here onCapture shows the picture in an img under the map instead, and nothing leaves the page.',
  section: 'Widgets',
  tags: ['ScreenshotWidget', 'onCapture', 'imageFormat', 'filename', 'captureScreenToDataURL'],
  docs: [
    'repo/docs/api-reference/widgets/screenshot-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

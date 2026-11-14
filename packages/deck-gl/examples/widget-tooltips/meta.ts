// deck-gl example: Widget tooltips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Widget tooltips',
  summary:
    'Built-in button widgets show styled tooltips on hover and focus. label sets the accessible name, tooltip props override the text with a string or an HTML element, and false hides the tooltip.',
  section: 'Widgets',
  tags: ['label', 'tooltip', 'zoomInTooltip', 'enterTooltip', 'tooltip: false', 'aria-label'],
  docs: [
    'repo/docs/api-reference/widgets/tooltips.md',
    'repo/docs/api-reference/widgets/zoom-widget.md',
    'repo/docs/api-reference/widgets/compass-widget.md',
    'repo/docs/api-reference/widgets/screenshot-widget.md',
    'repo/docs/api-reference/widgets/fullscreen-widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// deck-gl example: a custom widget that follows the viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: onViewportChange readout',
  summary:
    "A custom widget implements onViewportChange(viewport) to read the camera and calls updateHTML only when its text changes, since the method runs on every redraw. Its placement and precision props change through the Deck's widgets prop.",
  section: 'Custom widgets',
  tags: ['Widget', 'onViewportChange', 'updateHTML', 'viewport', 'placement', 'props'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

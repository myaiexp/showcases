// deck-gl example: ZoomWidget options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ZoomWidget options',
  summary:
    'A horizontal ZoomWidget at the bottom left with a 1.5 zoomStep, a half second transition and custom tooltips (one is an HTML element). Sliders change zoomStep and orientation through setProps.',
  section: 'Widgets',
  tags: ['ZoomWidget', 'orientation', 'zoomStep', 'transitionDuration', 'zoomInTooltip', 'setProps'],
  docs: [
    'repo/docs/api-reference/widgets/zoom-widget.md',
    'repo/docs/api-reference/widgets/tooltips.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

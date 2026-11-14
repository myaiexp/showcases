// deck-gl example: InfoWidget on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'InfoWidget on hover',
  summary:
    'An InfoWidget in hover mode shows a popup with an arrow above the hovered city. getTooltip returns a world position and HTML, so the popup is anchored to the city instead of the pointer.',
  section: 'Widgets',
  tags: ['InfoWidget', 'mode: hover', 'getTooltip', 'placement', 'arrow', 'offset', 'pickable'],
  docs: [
    'repo/docs/api-reference/widgets/info-widget.md',
    'repo/docs/api-reference/widgets/overview.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

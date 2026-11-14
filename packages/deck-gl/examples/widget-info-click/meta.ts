// deck-gl example: InfoWidget on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'InfoWidget on click',
  summary:
    'An InfoWidget in click mode whose getTooltip returns a DOM element. Controls change placement, offset and arrow size on the live widget with setProps; the popup stays anchored to the city.',
  section: 'Widgets',
  tags: ['InfoWidget', 'mode: click', 'getTooltip', 'element', 'placement', 'offset', 'arrow', 'setProps'],
  docs: [
    'repo/docs/api-reference/widgets/info-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

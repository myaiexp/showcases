// deck-gl example: PopupWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PopupWidget',
  summary:
    'Three PopupWidgets anchored to world positions: one open from the start, one behind a text marker, one that also closes on a click outside and drops the close button. onOpenChange reports each toggle.',
  section: 'Widgets',
  tags: ['PopupWidget', 'position', 'content', 'marker', 'defaultIsOpen', 'closeButton', 'closeOnClickOutside', 'onOpenChange'],
  docs: [
    'repo/docs/api-reference/widgets/popup-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

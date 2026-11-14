// deck-gl example: a custom widget that handles onHover and onClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: onHover and onClick',
  summary:
    "A custom widget overrides onHover(info) and onClick(info) to show the object under the pointer and pin the clicked one. The picking info is the same object a layer's onHover receives; the widget only re-renders when its text changes.",
  section: 'Custom widgets',
  tags: ['Widget', 'onHover', 'onClick', 'PickingInfo', 'picking', 'updateHTML'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

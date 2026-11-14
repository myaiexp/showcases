// deck-gl example: ToggleWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ToggleWidget',
  summary:
    'Two ToggleWidgets switch the land and the city dots on and off through the layer visible prop. Each state has its own icon, label and colour (onIcon, onLabel, onColor).',
  section: 'Widgets',
  tags: ['ToggleWidget', 'initialChecked', 'onIcon', 'onLabel', 'onColor', 'onChange', 'visible'],
  docs: [
    'repo/docs/api-reference/widgets/toggle-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

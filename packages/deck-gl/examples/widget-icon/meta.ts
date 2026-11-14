// deck-gl example: IconWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'IconWidget',
  summary:
    'IconWidget makes a button out of any SVG data URL. Two of them change layer props through onClick: one cycles the dot colour, one grows the dots. color paints the icon mask.',
  section: 'Widgets',
  tags: ['IconWidget', 'icon', 'color', 'onClick', 'label', 'tooltip'],
  docs: [
    'repo/docs/api-reference/widgets/icon-widget.md',
    'repo/docs/api-reference/widgets/tooltips.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

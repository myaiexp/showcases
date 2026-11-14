// vchart example: Reverse states: dimming the other marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reverse states: dimming the other marks',
  summary:
    'hover_reverse and selected_reverse style every mark that is not the hovered or selected one, so the active bar stands out while the rest fade. The card walks setHovered then setSelected across the bars; the full view lets the pointer do it.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['bar.state.hover', 'bar.state.hover_reverse', 'bar.state.selected_reverse', 'select', 'setHovered', 'setSelected'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md', 'repo/docs/assets/option/en/common/mark-state-style.md', 'repo/docs/assets/option/en/common/select.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

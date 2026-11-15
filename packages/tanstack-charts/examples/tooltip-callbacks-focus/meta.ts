// tanstack-charts example: onFocusChange and onFocusGroupChange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'onFocusChange and onFocusGroupChange',
  summary:
    'Callbacks report the semantic state without a framework: onFocusChange gets the primary ChartPoint or null, and onFocusGroupChange gets the whole group. They fire only when the primary focus key changes. The readout prints the original datum rows.',
  section: 'Tooltips and Focus',
  tags: ['onFocusChange', 'onFocusGroupChange', 'ChartPoint', 'group-x'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

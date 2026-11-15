// tanstack-charts example: Grouped tooltip by x
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grouped tooltip by x',
  summary:
    'focus group-x gathers every series that shares the focused x value. The tooltip shows the shared month as a heading and one row with a colour swatch per series, and the focus ring marks the primary point.',
  section: 'Tooltips and Focus',
  tags: ['focus', 'group-x', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

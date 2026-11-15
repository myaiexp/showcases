// tanstack-charts example: Row order in a grouped tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Row order in a grouped tooltip',
  summary:
    'sort orders the series rows of a grouped tooltip: visual follows the lines top to bottom, color-domain follows the colour legend order, focus puts the hovered series first, and a comparator can order by anything, here by value.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.sort', 'group-x', 'color-domain'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

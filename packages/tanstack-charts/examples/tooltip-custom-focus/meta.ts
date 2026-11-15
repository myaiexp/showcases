// tanstack-charts example: A custom focus strategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom focus strategy',
  summary:
    'A focus strategy is an object with resolve, group and navigation. This one snaps to the nearest x and always focuses the highest line in that column, groups the column for the tooltip, and gives the keyboard one stop per month. It owns pointer and keyboard together.',
  section: 'Tooltips and Focus',
  tags: ['ChartFocusStrategy', 'resolve', 'group', 'navigation', 'focus'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

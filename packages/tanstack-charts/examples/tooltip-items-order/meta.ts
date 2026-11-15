// tanstack-charts example: Ordered tooltip rows with items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ordered tooltip rows with items',
  summary:
    'tooltip.items lists the rows for one focused point in the order written: a formatted y value, a datum field, a derived text row and the x value. A row whose value is nullish is left out.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.items', 'channel', 'field', 'text'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// tanstack-charts example: Sharing a cursor by y value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sharing a cursor by y value',
  summary:
    'match y shares the focused category instead of a date. Two horizontal bar charts with different x scales, revenue and units, share one cursor, so hovering a product in one highlights the same product in the other with a cursor band.',
  section: 'Interactions and Selections',
  tags: ['createChartCursor', 'cursorHost', 'match', 'barX', 'crosshair', 'band'],
  docs: [
    'repo/docs/guides/interactions-and-selections.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// tanstack-charts example: Summaries with boxRows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Summaries with boxRows',
  summary:
    'boxRows runs the same Tukey preparation eagerly and returns plain rows: one summary row per category followed by the outliers. The readout lists the quartiles, whiskers and counts from those rows, which a table or other marks could use as well as the box mark.',
  section: 'Box Marks',
  tags: ['boxRows', 'BoxDatum', 'kind'],
  docs: ['repo/docs/reference/marks/box.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

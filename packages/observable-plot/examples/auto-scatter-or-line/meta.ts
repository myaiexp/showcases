// observable-plot example: Auto: scatterplot or line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: scatterplot or line',
  summary:
    'Plot.auto picks a mark from the data: two quantitative columns make a scatterplot, a date and a number make a line chart.',
  section: 'Mark: Auto',
  tags: ['auto'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/penguins.ts', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

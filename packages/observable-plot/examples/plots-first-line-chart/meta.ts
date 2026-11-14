// observable-plot example: Plots: a first line chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: a first line chart',
  summary:
    'Apple\'s daily close price drawn by a single lineY mark that binds x to Date and y to Close.',
  section: 'Plots',
  tags: ['Plot.plot', 'Plot.lineY', 'marks'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

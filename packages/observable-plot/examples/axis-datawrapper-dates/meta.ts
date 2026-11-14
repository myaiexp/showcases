// observable-plot example: Axis: Datawrapper-style date axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: Datawrapper-style date axis',
  summary:
    'Time axes use a two-field tick format by default; here axisX with ticks of 3 months shows the first month of each quarter and the year, with a grid.',
  section: 'Mark: Axis',
  tags: ['axisX', 'gridX', 'ticks', 'line'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

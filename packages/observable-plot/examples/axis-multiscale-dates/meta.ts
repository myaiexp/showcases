// observable-plot example: Axis: multiscale date axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: multiscale date axis',
  summary:
    'Three layered axes show weeks, months and years on one time scale, using tickSize, tickPadding, tickFormat and textAnchor, plus a week grid and a framed band.',
  section: 'Mark: Axis',
  tags: ['axisX', 'gridX', 'frame', 'tickSize', 'tickPadding', 'nice', 'step'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

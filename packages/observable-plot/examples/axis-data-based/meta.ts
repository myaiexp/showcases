// observable-plot example: Axis: ticks positioned by data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: ticks positioned by data',
  summary:
    'Tick values are data: gridY and axisY take an x channel computed from each tick value, so the labels sit where the line first reaches that price.',
  section: 'Mark: Axis',
  tags: ['axisY', 'gridY', 'textStroke', 'line'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

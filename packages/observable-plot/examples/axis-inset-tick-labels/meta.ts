// observable-plot example: Axis: tick labels inside the frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: tick labels inside the frame',
  summary:
    'A y axis whose tick labels start at the axis and run right into the plot, through textAnchor start, a dx offset and a fill that contrasts with the bars.',
  section: 'Mark: Axis',
  tags: ['axisY', 'barX', 'textAnchor', 'dx', 'fill'],
  docs: ['repo/docs/marks/axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

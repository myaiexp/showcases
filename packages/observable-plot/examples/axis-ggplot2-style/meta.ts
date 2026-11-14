// observable-plot example: Axis: ggplot2-style frame and grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: ggplot2-style frame and grid',
  summary:
    'Layered frame, gridY and gridX marks give a filled panel with white grid lines, in the manner of ggplot2, under an Apple stock line.',
  section: 'Mark: Axis',
  tags: ['frame', 'gridX', 'gridY', 'line', 'inset'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

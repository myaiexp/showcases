// observable-plot example: Axis: New York Times style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: New York Times style',
  summary:
    'Dashed grid lines with tick labels inset above them, no tick marks and a dollar sign on the top tick, from axisY options tickSize, dx, dy, lineAnchor and tickFormat.',
  section: 'Mark: Axis',
  tags: ['axisY', 'gridY', 'tickFormat', 'lineAnchor', 'markerEnd'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

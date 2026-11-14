// Chart.js example: Padding at the axis ends
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Padding at the axis ends",
  summary:
    "offset adds half a slot of space at both ends of the x axis, so bars are not cut in half and a line does not touch the frame. Toggle it on a mixed bar and line chart.",
  section: 'Axes',
  tags: ['offset','scales.x','mixed'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/mixed.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

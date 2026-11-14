// Chart.js example: Headroom above the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Headroom above the data",
  summary:
    "grace pads the axis range above the highest and below the lowest value, as a plain amount or a percentage like '10%', so the biggest bar does not touch the frame.",
  section: 'Axes',
  tags: ['grace','linear','scales.y'],
  docs: ['repo/docs/axes/cartesian/linear.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

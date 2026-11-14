// Chart.js example: Where an axis sits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Where an axis sits",
  summary:
    "position puts an axis on an edge, in the centre of the plot, or at a data value such as {y: 0}, so a scatter chart can show its quadrants around zero.",
  section: 'Axes',
  tags: ['position','scales.x','scales.y','scatter'],
  docs: ['repo/docs/axes/cartesian/index.md','repo/docs/charts/scatter.md','repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// Chart.js example: Starting the axis at zero, or not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Starting the axis at zero, or not",
  summary:
    "Whether a line starts at zero changes the story: a one-point wobble looks dramatic or flat. beginAtZero on the linear axis includes 0 in the range.",
  section: 'Axes',
  tags: ['beginAtZero','linear','scales.y'],
  docs: ['repo/docs/axes/cartesian/linear.md','repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// Chart.js example: Reversed axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reversed axis",
  summary:
    "reverse flips the direction an axis grows. Depth is the classic case: with reverse the surface is at the top and the line dives as you read down.",
  section: 'Axes',
  tags: ['reverse','scales.y','scatter'],
  docs: ['repo/docs/axes/_common.md','repo/docs/axes/cartesian/linear.md','repo/docs/charts/scatter.md','repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

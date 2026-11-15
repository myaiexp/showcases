// tanstack-charts example: binXY with a chosen reducer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binXY with a chosen reducer",
  summary:
    "binXY cuts the plane into cells and reduces each one; outputs picks the reducer and the field. The select shows count, the sum of weights, and the mean of weights over the same cells, drawn with rect and a colour ramp.",
  section: "Data Transforms",
  tags: ["binXY", "outputs", "count", "sum", "mean", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

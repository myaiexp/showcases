// tanstack-charts example: binX outputs: count and a second reducer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binX outputs: count and a second reducer",
  summary:
    "binX gives each bin a count by default; outputs replaces that with named reducers. Here every bin has a count and the mean of another field, and the bars show the count while their colour shows the mean y of the points in the bin.",
  section: "Data Transforms",
  tags: ["binX", "outputs", "mean", "rect"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

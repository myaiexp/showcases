// tanstack-charts example: rollingWindow with several outputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rollingWindow with several outputs",
  summary:
    "A rolling window can compute many outputs at once. A 10-day window gives the minimum, mean and maximum of a series, and areaY draws the min-to-max band under the mean line, all from one transform call.",
  section: "Data Transforms",
  tags: ["rollingWindow", "outputs", "min", "max", "mean", "areaY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

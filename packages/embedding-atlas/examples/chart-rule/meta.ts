// embedding-atlas example: a rule mark for mean, median or quantile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rule marks",
  summary:
    "A rule mark takes a single x (or y) encoding and draws a line across the plot. Over a words histogram, the variants mark the mean, the median and the 90th percentile.",
  section: "Charts",
  tags: ['mark: rule', 'aggregate', 'quantile', 'style'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

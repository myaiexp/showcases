// embedding-atlas example: aggregate: "quantile" with the quantile option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Quantile aggregate",
  summary:
    "Bars of the 10th, 50th and 90th percentile of words per source. The quantile aggregate needs the extra quantile value, a number from 0 to 1.",
  section: "Charts",
  tags: ['aggregate', 'quantile'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// observable-plot example: Difference: global temperature anomaly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Difference: global temperature anomaly",
  summary: "differenceY against a constant zero: red where the global temperature anomaly is above the 1951 to 1980 average, blue below. A toggle smooths it with a 24-month windowY moving average.",
  section: 'Mark: Difference',
  tags: ['differenceY', 'windowY', 'positiveFill', 'negativeFill', 'tip'],
  docs: ['repo/docs/marks/difference.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

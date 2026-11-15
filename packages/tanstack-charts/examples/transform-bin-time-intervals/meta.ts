// tanstack-charts example: binTimeX calendar intervals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binTimeX calendar intervals",
  summary:
    "binTimeX bins dates with a time interval that has floor, offset and range, so bins start on day, week or month boundaries instead of equal-width numbers. The select changes the interval over the same orders and counts per bin follow.",
  section: "Data Transforms",
  tags: ["binTimeX", "utcDay", "utcWeek", "utcMonth", "rect"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

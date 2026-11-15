// tanstack-charts example: mosaicX transposes the policy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mosaicX transposes the policy",
  summary:
    "mosaicX makes row heights follow each question's total and divides x within each row by response. The same counts as the mosaicY example, turned sideways, so the row with the most answers is the tallest.",
  section: "Data Transforms",
  tags: ["mosaicX", "groupBy", "rect"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// tanstack-charts example: waterfall orderBy and order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "waterfall orderBy and order",
  summary:
    "The steps are given in a mixed order with a month on each. orderBy sorts them by month before the levels accumulate, and order descending runs the accumulation backwards from the last month. The select shows input order and both sortings.",
  section: "Data Transforms",
  tags: ["waterfall", "orderBy", "order", "barY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

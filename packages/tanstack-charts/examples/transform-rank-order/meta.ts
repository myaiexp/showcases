// tanstack-charts example: rank order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rank order",
  summary:
    "rank orders by its value, ascending by default, and order sets which end gets rank 1. The same scores ranked with the highest first and the lowest first, so rank 1 means winner or best time depending on what the value is.",
  section: "Data Transforms",
  tags: ["rank", "order", "barX"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

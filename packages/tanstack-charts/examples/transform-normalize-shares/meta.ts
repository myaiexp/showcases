// tanstack-charts example: Normalize to shares of a total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normalize to shares of a total",
  summary:
    "With basis sum and by quarter, each product's revenue becomes its share of the quarter total, and a stacked bar then fills the full height. The share is a named column, so a tooltip and the axis can read it.",
  section: "Data Transforms",
  tags: ["normalize", "sum", "by", "barY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

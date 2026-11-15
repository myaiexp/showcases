// tanstack-charts example: Per-cell statistics from the cell's rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Per-cell statistics from the cell's rows",
  summary:
    "The chart callback gets only the rows of its own group, so it can compute a statistic for them. Each facet draws its points and a rule at its own mean, and the cell's key picks the colour. The same code serves any number of groups.",
  section: "Faceting and Composition",
  tags: ["facetChart", "ruleY", "dot", "key"],
  docs: ["repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

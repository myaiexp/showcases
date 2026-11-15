// tanstack-charts example: Non-finite values and lineage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Non-finite values and lineage",
  summary:
    "Numeric reducers skip null, NaN and infinite values, but source and sourceIndexes still list every row of the group. A few amounts are missing: the mean is computed from the finite ones while the group's source count is larger. The select compares the unfiltered rows with rows filtered first, so lineage lists contributors only.",
  section: "Data Transforms",
  tags: ["groupBy", "mean", "source", "sourceIndexes"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

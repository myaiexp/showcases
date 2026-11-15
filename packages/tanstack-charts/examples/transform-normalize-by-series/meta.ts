// tanstack-charts example: Index series to their first value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Index series to their first value",
  summary:
    "normalize with by and basis first divides every series by its own first value, so series that start at different levels all start at 1. The select compares the raw values with the indexed ones.",
  section: "Data Transforms",
  tags: ["normalize", "by", "first", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

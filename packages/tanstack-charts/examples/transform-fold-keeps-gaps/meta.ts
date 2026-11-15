// tanstack-charts example: Fold keeps null and NaN values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold keeps null and NaN values",
  summary:
    "fold does not filter values: a missing reading stays in the folded rows as null or NaN, ready for later transforms or for the line mark to break on. The select switches between the folded rows as they are and the same rows with the missing values removed first.",
  section: "Data Transforms",
  tags: ["fold", "lineY", "null", "NaN"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

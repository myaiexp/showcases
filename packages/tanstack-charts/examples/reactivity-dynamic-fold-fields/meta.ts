// tanstack-charts example: Fold fields chosen at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold fields chosen at runtime",
  summary:
    "The field list for fold comes from checkboxes. The code checks it for emptiness and duplicates before calling fold, because option mistakes throw synchronously, then re-runs the transform and redraws the lines. Long rows from the chosen fields keep the other columns.",
  section: "Transforms and Reactivity",
  tags: ["fold", "lineY", "validation"],
  docs: [
    'repo/docs/guides/transforms-and-reactivity.md',
    'repo/docs/reference/transforms.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

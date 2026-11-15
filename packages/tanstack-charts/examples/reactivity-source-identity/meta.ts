// tanstack-charts example: Replace the source, do not mutate it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replace the source, do not mutate it",
  summary:
    "Transform results are plain arrays computed once, so a chart cannot see a row changed in place. One button edits a derived row in place and the chart does not notice; the other builds a new source array, re-runs the transform and the bars update.",
  section: "Transforms and Reactivity",
  tags: ["groupBy", "barY", "host.update"],
  docs: ['repo/docs/guides/transforms-and-reactivity.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

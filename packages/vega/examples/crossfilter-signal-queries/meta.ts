// vega example: Crossfilter: Queries from Signals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crossfilter: Queries from Signals",
  summary:
    "Sliders drive crossfilter queries, with delay filtered twice for a lower and an upper bound; the scatter shows the surviving flights.",
  section: "Transforms: Cross-Filter",
  tags: ["transform.crossfilter.fields", "transform.crossfilter.query", "transform.crossfilter.signal"],
  docs: ["repo/docs/docs/transforms/crossfilter.md", "repo/docs/docs/transforms/resolvefilter.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/signals.md", "repo/docs/docs/marks.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

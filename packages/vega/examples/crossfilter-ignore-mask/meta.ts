// vega example: Crossfilter: Resolvefilter Ignore Mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crossfilter: Resolvefilter Ignore Mask",
  summary:
    "Seven resolvefilter data sets, each ignoring a different bit mask of the three queries, show how many flights pass.",
  section: "Transforms: Cross-Filter",
  tags: ["transform.resolvefilter.ignore", "transform.crossfilter.query"],
  docs: ["repo/docs/docs/transforms/crossfilter.md", "repo/docs/docs/transforms/resolvefilter.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

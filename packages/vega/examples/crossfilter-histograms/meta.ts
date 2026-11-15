// vega example: Crossfilter: Linked Histograms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crossfilter: Linked Histograms",
  summary:
    "Delay, time and distance histograms of 4000 generated flights: brush any one and the other two redraw with only the flights that pass.",
  section: "Transforms: Cross-Filter",
  tags: ["transform.crossfilter", "transform.resolvefilter", "transform.bin", "signal.on"],
  docs: ["repo/docs/docs/transforms/crossfilter.md", "repo/docs/docs/transforms/resolvefilter.md", "repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/signals.md", "repo/docs/docs/event-streams.md", "repo/docs/docs/expressions.md", "repo/docs/docs/marks.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

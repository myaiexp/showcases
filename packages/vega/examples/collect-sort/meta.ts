// vega example: Collect: Sorting Objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collect: Sorting Objects",
  summary:
    "Ten rows collected with a two-level comparator: group first, then a chosen field in a chosen direction. The band scale takes its domain from the collected order, so the bars reorder with the selects.",
  section: 'Transforms: Basic',
  tags: ["transform.collect.sort", "scale.domain"],
  docs: ["repo/docs/docs/transforms/collect.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

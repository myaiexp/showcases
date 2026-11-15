// vega example: Cross: Pairs with a Filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cross: Pairs with a Filter",
  summary:
    "A growing list of numbers crossed with itself three ways: all pairs, pairs of distinct values, and ordered pairs. Each grid cell is one output row {a, b} and the counts show n squared, n(n-1) and n(n-1)/2.",
  section: 'Transforms: Basic',
  tags: ["transform.cross.filter", "transform.cross", "transform.filter"],
  docs: ["repo/docs/docs/transforms/cross.md", "repo/docs/docs/transforms/filter.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

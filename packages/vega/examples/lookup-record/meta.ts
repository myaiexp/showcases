// vega example: Lookup: Whole Record
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lookup: Whole Record",
  summary:
    "Roads are only pairs of town names. Looking up both fields in the towns table attaches the whole town records as a and b, and the rule marks draw from a's coordinates to b's. New roads re-resolve.",
  section: 'Transforms: Basic',
  tags: ["transform.lookup.fields", "transform.lookup.as", "transform.lookup.from", "transform.lookup.key"],
  docs: ["repo/docs/docs/transforms/lookup.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

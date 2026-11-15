// vega example: Impute: Constant Value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Impute: Constant Value",
  summary:
    "Three series with missing x values. Impute adds one row per missing pair (hollow rings) with a constant y, and keyvals invents an extra x = 6 for every series; the constant comes from a slider.",
  section: 'Transforms: Basic',
  tags: ["transform.impute.value", "transform.impute.keyvals", "transform.impute.groupby", "transform.impute.key"],
  docs: ["repo/docs/docs/transforms/impute.md", "repo/docs/docs/marks/group.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

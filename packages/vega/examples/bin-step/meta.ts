// vega example: Bin: Exact Step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Exact Step",
  summary:
    "The same sample binned with an exact step. Even with maxbins at 3, every step from 2 to 25 yields bins of exactly that width.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.step", "transform.bin.maxbins", "signal.bind"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

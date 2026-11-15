// vega example: Bin: Computed Spec Signal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Computed Spec Signal",
  summary:
    "Bin restricted to steps of 2.5, 5 or 25, with an optional minimum step. The signal option publishes the chosen start, stop and step, which feed the title and the bracket under the axis.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.signal", "transform.bin.steps", "transform.bin.minstep", "transform.bin.maxbins"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Bin: Maximum Bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Maximum Bins",
  summary:
    "A two-peaked sample binned over [0, 100]. Raising maxbins narrows the bins in nice steps (5, 2, 1...), and the bound spec signal in the title and the table show start, step and each bin's edges.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.maxbins", "transform.bin.signal", "transform.bin.extent", "transform.aggregate", "transform.collect"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/transforms/collect.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

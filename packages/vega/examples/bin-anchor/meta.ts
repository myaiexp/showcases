// vega example: Bin: Anchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Anchor",
  summary:
    "Fixed 20-wide bins whose boundaries slide with the anchor value; the dashed orange rule marks the anchor and one bin edge always sits on it.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.anchor", "transform.bin.step", "signal.bind"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Bin: Interval and Output Fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Interval and Output Fields",
  summary:
    "Values binned into steps of 20 and written to lo and hi. Switching interval off writes lo only: the hi column and the shaded bin bands disappear.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.interval", "transform.bin.as", "transform.bin.step"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

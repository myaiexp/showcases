// vega example: Bin: Nice Boundaries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin: Nice Boundaries",
  summary:
    "Binning an extent of 3.7 to 96.2. With nice on the edges land on round numbers (0, 10, 20...); off, they start at 3.7 with an awkward step, as the title and edge table show.",
  section: 'Transforms: Basic',
  tags: ["transform.bin.nice", "transform.bin.extent", "transform.bin.signal"],
  docs: ["repo/docs/docs/transforms/bin.md", "repo/docs/docs/transforms/aggregate.md", "repo/docs/docs/transforms/collect.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

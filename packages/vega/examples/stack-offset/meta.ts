// vega example: Stack: Offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stack: Offset",
  summary:
    "Four series stacked as areas with offset zero, center (a streamgraph) or normalize (shares of one).",
  section: "Transforms: Layout",
  tags: ["transform.stack.offset", "transform.stack.groupby"],
  docs: ["repo/docs/docs/transforms/stack.md", "repo/docs/docs/transforms/stack.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/marks.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

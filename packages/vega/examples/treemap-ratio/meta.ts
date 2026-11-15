// vega example: Treemap: Squarify Ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: Squarify Ratio",
  summary:
    "The squarify target aspect ratio changes how wide or tall leaf boxes are; each box prints its actual width to height ratio.",
  section: "Transforms: Hierarchy",
  tags: ["transform.treemap.ratio", "transform.treemap.round", "transform.treemap.method"],
  docs: ["repo/docs/docs/transforms/treemap.md", "repo/docs/docs/transforms/stratify.md", "repo/docs/docs/transforms/treemap.vg.json", "repo/docs/docs/signals.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Heatmap: color and opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: color and opacity",
  summary:
    "A kde2d grid of 1000 points drawn by the heatmap transform as one colour with opacity from an expression; a select picks the colour and a slider the opacity exponent.",
  section: "Transforms: Geographic",
  tags: ["transform.heatmap", "transform.heatmap.color", "transform.heatmap.opacity", "transform.kde2d", "mark.image"],
  docs: ["repo/docs/docs/transforms/heatmap.md", "repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/marks/image.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

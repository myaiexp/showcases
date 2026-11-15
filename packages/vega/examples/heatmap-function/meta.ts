// vega example: Heatmap: Expression Colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: Expression Colours",
  summary:
    "A heatmap with no grid: a colour expression over the pixel coordinates $x and $y and a spectral scale paints an interference pattern whose frequency changes.",
  section: "Transforms: Geographic",
  tags: ["transform.heatmap", "transform.heatmap.color", "scale.range.scheme", "mark.image"],
  docs: ["repo/docs/docs/transforms/heatmap.md", "repo/docs/docs/marks/image.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

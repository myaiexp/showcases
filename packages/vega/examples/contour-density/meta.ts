// vega example: Contour (deprecated)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour (deprecated)",
  summary:
    "The deprecated contour transform that estimates density and cuts the contours in one step, with count and bandwidth sliders; the docs say to use kde2d and isocontour instead.",
  section: "Transforms: Geographic",
  tags: ["transform.contour", "transform.contour.count", "transform.contour.bandwidth"],
  docs: ["repo/docs/docs/transforms/contour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

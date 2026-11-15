// vega example: Isocontour: scale and translate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: scale and translate",
  summary:
    "Density contours whose coordinates are scaled by [sx, sy] and translated by [dx, dy]; the grid-to-pixel scale of 4 is exact and anything else warps the outlines.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour.scale", "transform.isocontour.translate", "transform.kde2d.cellSize"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/kde2d.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

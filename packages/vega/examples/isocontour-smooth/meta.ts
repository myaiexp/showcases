// vega example: Isocontour: smooth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: smooth",
  summary:
    "Contours of a coarse 28 by 16 raster with and without linear interpolation: smooth off shows the stepped cell edges.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour.smooth", "transform.isocontour.thresholds", "transform.isocontour.scale"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

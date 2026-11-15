// vega example: Isocontour: thresholds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Isocontour: thresholds",
  summary:
    "Explicit contour values in place of equal levels, cut from a generated raster of two bumps; three sliders set the thresholds and scale maps cells to pixels.",
  section: "Transforms: Geographic",
  tags: ["transform.isocontour.thresholds", "transform.isocontour.scale", "transform.geoshape"],
  docs: ["repo/docs/docs/transforms/isocontour.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/marks/shape.md", "repo/docs/docs/scales.md", "repo/docs/docs/schemes.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

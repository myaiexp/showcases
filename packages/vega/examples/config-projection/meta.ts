// vega example: Projection default
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Projection default",
  summary:
    "config projection sets the default projection type, so one unnamed-type projection draws the world as equalEarth, orthographic, mercator and azimuthalEqualArea in turn.",
  section: "Config",
  tags: ["config.projection", "projection.fit"],
  docs: [
    "repo/docs/docs/config.md",
    "repo/docs/docs/projections.md",
    "repo/docs/docs/transforms/geoshape.md",
    "repo/docs/docs/data.md",
    "repo/docs/docs/marks/shape.md",
  ],
  provenance: "pure",
  added: "2026-11-15",
});

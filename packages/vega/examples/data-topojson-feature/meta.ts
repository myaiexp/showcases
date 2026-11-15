// vega example: TopoJSON feature
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "TopoJSON feature",
  summary:
    "format topojson with feature turns the states object set into one GeoJSON feature per state, drawn with geoshape and an albersUsa projection.",
  section: "Data",
  tags: ["data.format.feature", "data.format.type"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/transforms/geoshape.md",
    "repo/docs/docs/projections.md",
    "repo/docs/data/us-10m.json",
  ],
  provenance: "pure",
  added: "2026-11-15",
});

// vega example: TopoJSON mesh
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "TopoJSON mesh",
  summary:
    "format topojson with mesh and filter extracts the state borders as one shape: all borders, interior only, or only the exterior outline.",
  section: "Data",
  tags: ["data.format.mesh", "data.format.filter"],
  docs: [
    "repo/docs/docs/data.md",
    "repo/docs/docs/transforms/geoshape.md",
    "repo/docs/docs/projections.md",
    "repo/docs/data/us-10m.json",
  ],
  provenance: "pure",
  added: "2026-11-15",
});

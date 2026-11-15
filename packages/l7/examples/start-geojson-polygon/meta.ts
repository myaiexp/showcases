// l7 example: Data: a GeoJSON polygon
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Data: a GeoJSON polygon",
  summary: "The data page's example is a FeatureCollection holding one Polygon, handed straight to a layer with no parser. The triangle is the doc's own coordinate list shifted onto Europe; a PointLayer reading the same GeoJSON draws only one dot for it.",
  section: "Getting Started",
  tags: ["GeoJSON","FeatureCollection","Polygon","source"],
  docs: ["repo/site/docs/tutorial/data.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

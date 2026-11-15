// l7 example: shape(field, callback)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "shape(field, callback)",
  summary: "shape can read a field too: a callback returns a shape name per row. Points with v above the threshold draw as circles and the rest as triangles; move the slider to re-split them.",
  section: "Layer: Encoding",
  tags: ["shape","callback","circle","triangle"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

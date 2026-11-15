// l7 example: shape(field, shapes)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "shape(field, shapes)",
  summary: "shape(field, list) maps each category of a field to one entry of the list, the way color does with colours. Types a, b and c become circle, square and triangle.",
  section: "Layer: Encoding",
  tags: ["shape","field","circle","square","triangle"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

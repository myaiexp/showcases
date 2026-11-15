// l7 example: filter(field, callback)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "filter(field, callback)",
  summary: "filter maps each value to true or false and only the true ones are drawn. Tick the categories to keep; hidden ones are skipped by the layer, not removed from its data.",
  section: "Layer: Encoding",
  tags: ["filter","callback","render"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

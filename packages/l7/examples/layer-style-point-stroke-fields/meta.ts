// l7 example: Style mapping: stroke, strokeWidth, strokeOpacity
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: stroke colour",
  summary: "stroke can be mapped from a field with { field, value }: types a, b and c get three outline colours on one layer. strokeWidth and strokeOpacity are listed as mappable in the docs but are plain numbers in 2.29.1.",
  section: "Layer: Style",
  tags: ["style", "stroke", "strokeWidth", "style data mapping", "field", "value"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

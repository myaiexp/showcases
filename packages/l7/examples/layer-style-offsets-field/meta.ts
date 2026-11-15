// l7 example: Style mapping: offsets from a field
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: offsets from a field",
  summary: "offsets moves a symbol away from its coordinate, and { field, value } makes the shift depend on the data: here a callback turns each point's id into its own [x, y] in pixels. The white dots mark the true positions; the slider sets how far the red ones are pushed.",
  section: "Layer: Style",
  tags: ["style","offsets","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: Style mapping: textOffset from a field
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: textOffset from a field",
  summary: "On a text layer textOffset moves each label relative to its anchor, and { field, value } lets a callback pick a different [x, y] per category. Labels of type a sit above their dot, b below, c to the right.",
  section: "Layer: Style",
  tags: ["style","textOffset","text","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

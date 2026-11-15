// l7 example: Style mapping: polygon opacity
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: polygon opacity",
  summary: "A polygon fill takes opacity from a field through { field, value }: density is mapped onto 0.1 to 1, so denser countries are more solid and sparse ones almost see through. The slider rotates the densities between countries and the opacity follows them. A bare field name such as 'density' is not read as a mapping in 2.29.1.",
  section: "Layer: Style",
  tags: ["style","opacity","polygon","fill","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

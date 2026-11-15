// l7 example: Style mapping: thetaOffset from a field
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: thetaOffset from a field",
  summary: "Arcs take their curvature from thetaOffset, and { field, value } gives every arc its own: the count column is mapped onto a range, so busy routes bend more than quiet ones. The slider stretches the upper end of that range.",
  section: "Layer: Style",
  tags: ["style","thetaOffset","arc","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

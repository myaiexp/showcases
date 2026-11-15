// l7 example: Style mapping: column opacity
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: column opacity",
  summary: "Extruded point columns map opacity from a field too, with the same { field, value } object: the columns with a larger v are drawn more solid, so the cluster reads as a soft skyline.",
  section: "Layer: Style",
  tags: ["style","opacity","cylinder","extrude","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

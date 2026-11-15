// l7 example: Style mapping: line opacity
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Style mapping: line opacity",
  summary: "On a line layer opacity can come from a field as well: { field: 'count', value: [0.15, 1] } fades each route by its own count, and other ranges change how strongly. Pick a range to compare.",
  section: "Layer: Style",
  tags: ["style","opacity","line","style data mapping"],
  docs: ["repo/site/docs/api/common/layer/layer_style.en.md","repo/site/docs/api/common/layer/style_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

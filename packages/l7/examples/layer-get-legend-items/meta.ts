// l7 example: getLegendItems('color' | 'size')
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "getLegendItems('color' | 'size')",
  summary: "getLegendItems(type) returns the legend entries for a channel: for a quantize colour scale, one item per class with its value range and colour. The panel prints them and updates when the data field changes.",
  section: "Layer: Interaction",
  tags: ["getLegendItems","legend","color","size"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

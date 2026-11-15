// l7 example: getLegend('color')
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "getLegend('color')",
  summary: "getLegend(type) is getLegendItems with more: it returns the legend type, the mapped field and the items together. A legend drawn from its result sits on the map and follows the field you choose.",
  section: "Layer: Interaction",
  tags: ["getLegend","legend","field","items"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

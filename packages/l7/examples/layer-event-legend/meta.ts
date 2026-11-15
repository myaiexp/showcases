// l7 example: Layer events: legend:color and legend:size
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer events: legend:color and legend:size",
  summary: "When a colour or size mapping changes, the layer emits legend:color or legend:size carrying the field and the legend items. The panel rebuilds from those items each time the mapping is changed.",
  section: "Layer: Events",
  tags: ["legend","legend:color","legend:size","items","field"],
  docs: ["repo/site/docs/api/common/layer/layer_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

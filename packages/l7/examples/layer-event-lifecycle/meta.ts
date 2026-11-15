// l7 example: Layer events: inited, add and remove
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer events: inited, add and remove",
  summary: "inited fires once the layer has built its models, add when it joins the scene and remove when it is taken out. The buttons add and remove the layer; the card does it on a timer.",
  section: "Layer: Events",
  tags: ["inited","add","remove","addLayer","removeLayer"],
  docs: ["repo/site/docs/api/common/layer/layer_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

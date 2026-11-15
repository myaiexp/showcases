// l7 example: Layer event: click
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer event: click",
  summary: "layer.on('click') fires when an element of the layer is clicked and passes x, y, type, lngLat, feature and featureId. Click a point and the read-out lists the payload; the card clicks for you.",
  section: "Layer: Events",
  tags: ["click","on","feature","featureId","lngLat"],
  docs: ["repo/site/docs/api/common/layer/mouse_event.en.md","repo/site/docs/api/common/layer/layer_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

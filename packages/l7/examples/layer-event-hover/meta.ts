// l7 example: Layer events: mouseenter, mousemove, mouseout
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer events: mouseenter, mousemove, mouseout",
  summary: "mouseenter fires when the pointer reaches an element, mousemove while it travels over it and mouseout when it leaves. The chips count each event; hover the points, and the card's pointer wanders on and off them.",
  section: "Layer: Events",
  tags: ["mouseenter","mousemove","mouseout","on"],
  docs: ["repo/site/docs/api/common/layer/mouse_event.en.md","repo/site/docs/api/common/layer/layer_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

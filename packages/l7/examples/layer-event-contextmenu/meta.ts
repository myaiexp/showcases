// l7 example: Layer event: contextmenu
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer event: contextmenu",
  summary: "contextmenu fires on a right click over an element of the layer, which is where a custom menu would go. Right-click a point; the card sends the same event by hand.",
  section: "Layer: Events",
  tags: ["contextmenu","on"],
  docs: ["repo/site/docs/api/common/layer/mouse_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

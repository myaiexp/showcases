// l7 example: Layer events: unclick, unmousemove, unpick
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Layer events: unclick, unmousemove, unpick",
  summary: "The un-prefixed events fire when the pointer acts somewhere the layer has nothing: unmousemove while moving over empty map, unclick on a click that picks nothing and unpick when no element is picked. Click and move on the blank map.",
  section: "Layer: Events",
  tags: ["unclick","unmousemove","unmousedown","unmouseup","unpick","uncontextmenu"],
  docs: ["repo/site/docs/api/common/layer/mouse_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: show(), hide() and isVisible()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "show(), hide() and isVisible()",
  summary: "hide() takes a layer off the map without removing it, show() brings it back and isVisible() reports the state. The read-out repeats it after every call.",
  section: "Layer: Basics",
  tags: ["show","hide","isVisible","visible"],
  docs: ["repo/site/docs/api/common/layer/layer_ctr.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

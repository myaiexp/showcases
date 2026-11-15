// l7 example: setMinZoom() and setMaxZoom()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setMinZoom() and setMaxZoom()",
  summary: "The layer only draws between its minZoom and maxZoom. Move the two sliders, then zoom the map: outside the range the points vanish.",
  section: "Layer: Basics",
  tags: ["setMinZoom","setMaxZoom","minZoom","maxZoom"],
  docs: ["repo/site/docs/api/common/layer/layer_ctr.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

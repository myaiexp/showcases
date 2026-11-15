// l7 example: setData() every frame
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setData() every frame",
  summary: "setData() is cheap enough to drive an animation: a flock of points steers around the map and the layer is handed a new array every 100 ms, with colour still mapped from the heading field.",
  section: "Layer: Basics",
  tags: ["setData","animation","color"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

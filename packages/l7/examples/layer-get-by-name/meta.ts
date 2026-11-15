// l7 example: name option and getLayerByName()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "name option and getLayerByName()",
  summary: "A layer's name option is how the scene finds it again: scene.getLayerByName(name) returns the layer, so a button can restyle or hide a layer it holds no variable for. Each button looks one up by name.",
  section: "Layer: Basics",
  tags: ["name","getLayerByName","hide","show","style"],
  docs: ["repo/site/docs/api/common/layer/options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

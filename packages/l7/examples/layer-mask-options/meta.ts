// l7 example: Mask: maskLayers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: maskLayers",
  summary: "A layer built with maskLayers: [template] only draws where the template polygon is, here a disc that wanders across a scatter of points. The template is added to the scene hidden, and still cuts.",
  section: "Layer: Mask",
  tags: ["maskLayers","enableMask","maskInside","mask","PolygonLayer"],
  docs: ["repo/site/docs/api/common/layer/mask_options.en.md","repo/site/docs/api/common/layer/mask_method.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: Mask: countries as the template
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: countries as the template",
  summary: "Any polygon layer can be the template, including real country shapes. A scatter of points is cut to France, Germany and Poland, and a line layer of routes is cut by the same template.",
  section: "Layer: Mask",
  tags: ["maskLayers","PolygonLayer","LineLayer","PointLayer"],
  docs: ["repo/site/docs/api/common/layer/mask_options.en.md","repo/site/docs/api/common/layer/mask_method.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

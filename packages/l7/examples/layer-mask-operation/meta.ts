// l7 example: Mask: maskOperation
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: maskOperation",
  summary: "With two templates, maskOperation says how they combine: 'and' keeps only where the two polygons overlap and 'or' keeps everything either one covers. The docs word it the other way round. It is read from the template layers, so both discs carry it.",
  section: "Layer: Mask",
  tags: ["maskOperation","maskLayers","and","or"],
  docs: ["repo/site/docs/api/common/layer/mask_options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

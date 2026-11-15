// l7 example: Mask: maskInside
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: maskInside",
  summary: "maskInside decides which side of the template shows: true keeps what is inside the polygon, false keeps what is outside and cuts a hole. Flip it with the toggle.",
  section: "Layer: Mask",
  tags: ["maskInside","maskLayers","updateLayerConfig"],
  docs: ["repo/site/docs/api/common/layer/mask_options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: boxSelect(box, callback)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "boxSelect(box, callback)",
  summary: "layer.boxSelect([x1, y1, x2, y2], cb) returns the features whose points fall inside a pixel rectangle of the map. A box sweeps across the points and the ones it selects turn red.",
  section: "Layer: Events",
  tags: ["boxSelect","box select","feature"],
  docs: ["repo/site/docs/api/common/layer/layer_event.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

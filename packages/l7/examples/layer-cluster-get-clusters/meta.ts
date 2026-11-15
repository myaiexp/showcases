// l7 example: getClusters(zoom)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "getClusters(zoom)",
  summary: "With cluster on, source.getClusters(zoom) returns the aggregated features for any zoom level. The white rings are drawn from that call: drag the zoom and the rings merge or split, while the filled layer follows the map's own zoom.",
  section: "Layer: Encoding",
  tags: ["getClusters","cluster","clusterOptions","getSource"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

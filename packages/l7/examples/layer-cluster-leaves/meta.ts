// l7 example: getClustersLeaves(id)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "getClustersLeaves(id)",
  summary: "Click a cluster and getClustersLeaves(cluster_id) hands back the original points inside it, which a second layer draws in red. Cards click clusters for you.",
  section: "Layer: Encoding",
  tags: ["getClustersLeaves","cluster","cluster_id","click"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: Blend modes side by side
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Blend modes side by side",
  summary: "Four copies of the same red-over-blue overlap, each top layer created with a different blend: normal keeps its own color, additive sums, subtractive subtracts and max keeps the larger channel.",
  section: "Layer: Basics",
  tags: ["blend","normal","additive","subtractive","max","PointLayer"],
  docs: ["repo/site/docs/api/common/layer/options.en.md","repo/site/docs/api/base_layer/base.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

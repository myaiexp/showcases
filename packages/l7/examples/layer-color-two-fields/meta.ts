// l7 example: color('type*v', callback)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "color('type*v', callback)",
  summary: "A colour can read several fields at once: 'type*v' hands the callback both values in the order declared. Here red means type a with v over the threshold, and the slider moves that threshold.",
  section: "Layer: Encoding",
  tags: ["color","callback","multiple fields"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

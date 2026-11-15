// l7 example: Update a scale, then render
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Update a scale, then render",
  summary: "After the layer is added, calling scale() again with another type and then scene.render() re-colors it. Pick linear, quantile, quantize or threshold and watch the same values change colour.",
  section: "Layer: Basics",
  tags: ["scale","render","quantile","linear","quantize","threshold"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

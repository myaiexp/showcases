// l7 example: Scale: power
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: power",
  summary: "The power scale bends a continuous mapping by an exponent. The docs write the type as 'pow' in prose, but the type name L7 accepts is 'power'; the sample values crowd toward the low end, so the colours do too.",
  section: "Layer: Encoding",
  tags: ["scale","power","pow","linear"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

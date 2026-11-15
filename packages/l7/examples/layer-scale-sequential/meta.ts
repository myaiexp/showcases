// l7 example: Scale: sequential
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: sequential",
  summary: "sequential interpolates a smooth blend through all the colours you give it, however many, from the lowest to the highest value. Five stops here, shown against the stepped quantize scale.",
  section: "Layer: Encoding",
  tags: ["scale","sequential","quantize","color"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/tutorial/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

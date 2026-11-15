// l7 example: Scale: unknown colour
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: unknown colour",
  summary: "The domain lists only types a and b, so type c has no colour of its own. With unknown set, c draws in that colour; without it the cat scale quietly reuses the listed colours for c, which is easy to mistake for real data.",
  section: "Layer: Encoding",
  tags: ["scale","unknown","domain","cat"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/api/common/layer/color.en.md","repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

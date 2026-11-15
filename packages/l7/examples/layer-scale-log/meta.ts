// l7 example: Scale: log
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: log",
  summary: "Values spread over three orders of magnitude look like a few dark points and many pale ones on a linear scale. type: 'log' spreads the colours by powers of ten instead; flip between the two.",
  section: "Layer: Encoding",
  tags: ["scale","log","linear"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/tutorial/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

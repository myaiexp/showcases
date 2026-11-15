// l7 example: Scale: clamp and domain
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: clamp and domain",
  summary: "With domain [30, 70] the colour ramp runs between those values. clamp: true holds anything outside them at the end colours; clamp: false lets the ramp keep going past the ends.",
  section: "Layer: Encoding",
  tags: ["scale","clamp","domain","linear"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

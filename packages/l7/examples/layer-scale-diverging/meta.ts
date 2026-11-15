// l7 example: Scale: diverging with a neutral value
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: diverging with a neutral value",
  summary: "diverging uses three domain stops, min, neutral and max, so one hue grows for negative values and another for positive ones. Slide neutral to move where the colours meet; by default it is the middle of the data.",
  section: "Layer: Encoding",
  tags: ["scale","diverging","neutral","domain"],
  docs: ["repo/site/docs/api/common/layer/scale.en.md","repo/site/docs/api/common/layer/layer_encode.en.md","repo/site/docs/tutorial/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

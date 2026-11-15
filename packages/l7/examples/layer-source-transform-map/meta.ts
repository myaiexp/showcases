// l7 example: Source transforms: map
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Source transforms: map",
  summary: "A transform of type map runs a callback over every parsed item. Here CSV text arrives as strings; the callback turns lat, lng and v into numbers so the colour scale reads them as a continuous field.",
  section: "Layer: Encoding",
  tags: ["transforms","map","csv","parser","source"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md","repo/site/docs/api/source/source.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

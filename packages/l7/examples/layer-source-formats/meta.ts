// l7 example: One layer source in three formats
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "One layer source in three formats",
  
  summary: "A layer takes JSON rows, GeoJSON or CSV text through source(data, { parser }). The same cities are drawn three times, each copy fed a different format and nudged sideways with offsets so they sit side by side.",
  section: "Layer: Basics",
  tags: ["source","parser","json","geojson","csv"],
  docs: ["repo/site/docs/api/common/layer/source.en.md","repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: setData() with a new parser
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setData() with a new parser",
  summary: "setData(data, option) takes the source config for the new data. Switch between JSON rows and GeoJSON features: without an option the old parser stays, so a new format needs its own.",
  section: "Layer: Basics",
  tags: ["setData","parser","json","geojson"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md","repo/site/docs/api/common/layer/source.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

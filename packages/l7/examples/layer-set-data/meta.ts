// l7 example: setData() replaces the data
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setData() replaces the data",
  summary: "setData(data) swaps a layer's source and redraws it with the same mapping, without rebuilding the layer. Each press draws a fresh random scatter; the cards step through new data by timer.",
  section: "Layer: Basics",
  tags: ["setData","source"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

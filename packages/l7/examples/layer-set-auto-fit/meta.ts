// l7 example: setAutoFit() with setData()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setAutoFit() with setData()",
  summary: "setAutoFit(true) arms the layer to fit the map to its data the next time it updates. Nothing moves until setData() runs, then the map flies to the new extent; with setAutoFit(false) the camera stays put.",
  section: "Layer: Interaction",
  tags: ["setAutoFit","setData","autoFit"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

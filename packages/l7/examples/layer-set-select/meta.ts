// l7 example: setSelect(featureId)
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "setSelect(featureId)",
  summary: "setSelect(id) selects an element by its id, as if it had been clicked, in the colour given to select(); the selection stays until another is set. Call it only once the layer has initialised.",
  section: "Layer: Interaction",
  tags: ["setSelect","select","featureId"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

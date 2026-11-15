// l7 example: Mask: addMask() and removeMask()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: addMask() and removeMask()",
  summary: "addMask(layer) puts another template on a live layer and removeMask(layer) takes one off; call scene.render() afterwards. Each button toggles one of two discs. Removing the last one needs config.mask cleared too, or the layer vanishes instead of showing everything.",
  section: "Layer: Mask",
  tags: ["addMask","removeMask","render"],
  docs: ["repo/site/docs/api/common/layer/mask_method.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

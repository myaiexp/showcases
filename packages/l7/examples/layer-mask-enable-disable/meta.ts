// l7 example: Mask: disableMask() and enableMask()
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Mask: disableMask() and enableMask()",
  summary: "disableMask() should switch the cut off and enableMask() back on. In 2.29.1 disableMask() alone makes the layer vanish, because the mask flag latched at init is still tested; setting config.mask to false with it brings the points back. The second toggle shows the difference. The docs' enableMask snippet also calls disableMask by mistake.",
  section: "Layer: Mask",
  tags: ["disableMask","enableMask","maskLayers"],
  docs: ["repo/site/docs/api/common/layer/mask_method.en.md","repo/site/docs/api/common/layer/mask_options.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

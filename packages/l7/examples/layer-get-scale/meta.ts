// l7 example: getScale('color') and getScale('size')
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "getScale('color') and getScale('size')",
  summary: "getScale(name) returns the scale L7 built for a visual channel, a function from a data value to its colour or size. The docs' two-point example is drawn and the panel calls the scales for n1 and n2.",
  section: "Layer: Interaction",
  tags: ["getScale","color","size","scale"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md","repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

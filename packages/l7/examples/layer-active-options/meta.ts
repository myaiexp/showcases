// l7 example: active(): true, options and false
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "active(): true, options and false",
  summary: "active(true) uses the default hover highlight, active({ color, mix }) picks the colour and how much of the element's own colour it keeps, and active(false) turns hover highlighting off. Pick a mode and hover the countries.",
  section: "Layer: Interaction",
  tags: ["active","color","mix","hover"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// l7 example: select(): true, options and false
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "select(): true, options and false",
  summary: "select(true) keeps a clicked element highlighted, select({ color, mix }) styles that highlight and select(false) switches it off. Pick a mode and click the countries.",
  section: "Layer: Interaction",
  tags: ["select","color","mix","click"],
  docs: ["repo/site/docs/api/common/layer/layer_interaction.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});

// marked example: Price list items
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Price list items",
  summary:
    "A shopping basket where every line that ends in a price is laid out like a till receipt, with dotted leaders and the price at the right. It overrides renderer.listitem and falls back to the default for lines without a price.",
  section: "Renderer",
  tags: ["renderer", "listitem", "false", "this.parser.parse"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

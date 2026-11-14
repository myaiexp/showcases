// marked example: Callout boxes from quotes
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Callout boxes from quotes",
  summary:
    "Quotes that begin with Note, Warning or Tip turn into coloured callout boxes, like the tips in a documentation site. It overrides renderer.blockquote and falls back to the default for ordinary quotes.",
  section: "Renderer",
  tags: ["renderer", "blockquote", "this.parser.parse", "false"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

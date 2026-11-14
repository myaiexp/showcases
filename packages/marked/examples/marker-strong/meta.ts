// marked example: Bold as highlighter
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Bold as highlighter",
  summary:
    "Study notes where every **bold** word gets a highlighter-pen stroke, in a colour you can switch, next to the plain bold. It overrides renderer.strong and parses the inner tokens with this.parser.parseInline.",
  section: "Renderer",
  tags: ["renderer", "strong", "this.parser.parseInline"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

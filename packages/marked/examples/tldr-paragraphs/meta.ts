// marked example: TL;DR summary box
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "TL;DR summary box",
  summary:
    "A forum-style post where paragraphs starting with TL;DR become highlighted summary boxes and the rest stay ordinary paragraphs. It overrides renderer.paragraph and returns false for the others.",
  section: "Renderer",
  tags: ["renderer", "paragraph", "false", "this.parser.parseInline"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Renderer.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

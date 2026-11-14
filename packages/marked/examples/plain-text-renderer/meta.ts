// marked example: Markdown to plain text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Markdown to plain text",
  summary:
    "A recipe step stripped of every bold, link, code and heading mark, leaving only the words, such as for a search index or a page title. It sends inline tokens through Parser.textRenderer.",
  section: "Lexer and parser",
  tags: ["TextRenderer", "Parser", "textRenderer", "plain text"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Parser.ts", "repo/src/TextRenderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

// marked example: Edit the tokens in between
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Edit the tokens in between",
  summary:
    "Text is lexed to tokens, the tokens are reordered, filtered or shouted, and only then parsed into HTML. Pick an edit and see the page change, with no walkTokens or renderer override.",
  section: "Lexer and parser",
  tags: ["marked.lexer", "marked.parser", "tokens"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Lexer.ts", "repo/src/Parser.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

// marked example: Parse just the inline tokens
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Parse just the inline tokens",
  summary:
    "A heading rendered two ways: marked.parser() gives the whole <h1> block, Parser.parseInline() only its bold and italic words, which then fit into a tab title. For when you need a piece of a document, not all of it.",
  section: "Lexer and parser",
  tags: ["Parser.parseInline", "marked.parser", "inline tokens"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Parser.ts", "repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

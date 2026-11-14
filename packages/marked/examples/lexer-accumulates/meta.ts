// marked example: A Lexer that remembers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "A Lexer that remembers",
  summary:
    "Messages lexed one after another: one Lexer object keeps piling tokens on top of the old ones, while marked.lexer() starts empty for every message. Handy to know when lexing a stream in chunks.",
  section: "Lexer and parser",
  tags: ["Lexer", "lex", "marked.lexer", "tokens"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Lexer.ts", "repo/src/Parser.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

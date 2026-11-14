// marked example: Which rule matched
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Which rule matched",
  summary:
    "A page of notes where each block is labelled with the Lexer.rules block rule that claims it: heading, list, blockquote, fences, table, hr, html, paragraph. Hover a row to read the rule's regular expression.",
  section: "Lexer and parser",
  tags: ["Lexer.rules", "block rules", "tokenizer"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Lexer.ts", "repo/src/Parser.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

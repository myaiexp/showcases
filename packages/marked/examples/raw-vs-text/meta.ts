// marked example: A token's raw and text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "A token's raw and text",
  summary:
    "Pick a token and see which slice of the note it consumed (raw, markers and all) highlighted in the source, next to its text: a heading's text drops the #, while a paragraph's text keeps its ** markers, because the bold lives in its child tokens. The raw slices laid end to end rebuild the note.",
  section: "Lexer and parser",
  tags: ["raw", "text", "tokens", "marked.lexer"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Tokens.ts", "repo/src/Lexer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

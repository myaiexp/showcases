// marked example: Count tokens by type
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Count tokens by type",
  summary:
    "A bar chart of how many headings, paragraphs, list items and so on a piece of Markdown contains. It calls marked.lexer for the tokens and marked.walkTokens to tally them.",
  section: "Walk tokens",
  tags: ["marked.walkTokens","marked.lexer","token types"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts","repo/src/marked.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

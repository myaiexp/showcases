// marked example: Single star means bold
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Single star means bold",
  summary:
    "In this chat style *one star* is bold, as in Slack, while _underscores_ and **double stars** behave as usual. It overrides tokenizer.emStrong and uses this.lexer.inlineTokens for the inside.",
  section: "Tokenizer",
  tags: ["tokenizer","emStrong","strong","this.lexer","false"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Lexer.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

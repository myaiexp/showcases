// marked example: Curly quotes
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Curly quotes",
  summary:
    "A letter whose straight quotes become curly ones, \"...\" an ellipsis and \" -- \" a dash, with code spans left alone. It wraps the built-in tokenizer.inlineText and polishes the text it returns.",
  section: "Tokenizer",
  tags: ["tokenizer","inlineText","Tokenizer.prototype","typography"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Lexer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

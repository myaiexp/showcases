// marked example: File names on code blocks
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "File names on code blocks",
  summary:
    "A code fence like ```js title=\"app.js\" shows its file name as a tab above the block. A tokenizer.fences override stores the title on the token and a renderer.code override prints it.",
  section: "Tokenizer",
  tags: ["tokenizer","fences","renderer","code","Tokenizer.prototype"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Tokens.ts","repo/src/Renderer.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

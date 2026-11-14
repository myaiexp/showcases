// marked example: No indented code blocks
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "No indented code blocks",
  summary:
    "Pasted text with four leading spaces stays a normal paragraph instead of a grey code block, but fenced code still works. It switches off tokenizer.code, the indented-code tokenizer.",
  section: "Tokenizer",
  tags: ["tokenizer","code","fences","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

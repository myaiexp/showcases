// marked example: No raw HTML allowed
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "No raw HTML allowed",
  summary:
    "Typed <b> tags and <div> boxes are shown as the characters the writer typed instead of being used, while Markdown still works. It switches off tokenizer.html and tokenizer.tag, a first line of defence for a comment box.",
  section: "Tokenizer",
  tags: ["tokenizer","html","tag","undefined"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

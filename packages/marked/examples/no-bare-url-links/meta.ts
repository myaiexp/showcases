// marked example: Bare web addresses stay text
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Bare web addresses stay text",
  summary:
    "Web, www and e-mail addresses stop turning into links on their own, but <angle-bracket> and [text](url) links still work. It switches off tokenizer.url.",
  section: "Tokenizer",
  tags: ["tokenizer","url","autolink","gfm"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/rules.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

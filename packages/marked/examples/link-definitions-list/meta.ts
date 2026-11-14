// marked example: Collect link definitions
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Collect link definitions",
  summary:
    "Reference definition lines like [bread]: https://... print nothing by themselves; here a tokenizer.def override collects every one and the page lists them as a \"Sources\" box.",
  section: "Tokenizer",
  tags: ["tokenizer","def","reference links","Tokenizer.prototype"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Tokenizer.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});

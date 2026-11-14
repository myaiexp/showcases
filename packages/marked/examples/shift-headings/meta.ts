// marked example: Shift headings down a level
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Shift headings down a level",
  summary:
    "Headings in a short guide drop one level (h1 becomes h2) so it can sit inside a page that already has its own title. It is the docs' walkTokens example: depth += 1.",
  section: "Walk tokens",
  tags: ["walkTokens","heading","depth"],
  docs: ["repo/docs/USING_PRO.md","repo/src/Instance.ts","repo/src/Tokens.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
